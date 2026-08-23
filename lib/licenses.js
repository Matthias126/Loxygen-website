import crypto from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

// No 0/O/1/I/L — avoids characters that are easy to misread when a code is
// typed by hand instead of clicked.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 10;

function generateRedemptionCode() {
  const bytes = crypto.randomBytes(CODE_LENGTH);
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return code;
}

async function insertSeatsWithUniqueCodes(licenseId, seatCount) {
  const seatsToInsert = Array.from({ length: seatCount }, () => ({
    license_id: licenseId,
    redemption_code: generateRedemptionCode(),
  }));

  const { data, error } = await supabaseAdmin.from("seats").insert(seatsToInsert).select();

  if (error) {
    if (error.code === "23505") return insertSeatsWithUniqueCodes(licenseId, seatCount);
    throw error;
  }
  return data;
}

async function findSeatWithLicense(seatId) {
  const { data, error } = await supabaseAdmin
    .from("seats")
    .select("*, license:licenses(*)")
    .eq("id", seatId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createLicenseWithSeats({ ownerUserId, tierId, source = "manual", stripeFields = {} }) {
  const { data: tier, error: tierError } = await supabaseAdmin
    .from("course_price_tiers")
    .select("id, seat_count")
    .eq("id", tierId)
    .maybeSingle();

  if (tierError) throw tierError;
  if (!tier || !tier.seat_count) {
    throw new Error("This price tier has no seat count configured.");
  }

  const { data: license, error: licenseError } = await supabaseAdmin
    .from("licenses")
    .insert({
      owner_user_id: ownerUserId,
      source,
      seat_count: tier.seat_count,
      stripe_customer_id: stripeFields.stripeCustomerId ?? null,
      stripe_subscription_id: stripeFields.stripeSubscriptionId ?? null,
      stripe_price_id: stripeFields.stripePriceId ?? null,
    })
    .select()
    .single();

  if (licenseError) throw licenseError;

  const seats = await insertSeatsWithUniqueCodes(license.id, tier.seat_count);

  return { license, seats };
}

// Throw-on-error read helpers, for getServerSideProps — matches lib/courses.js.
export async function getMicroLearningsAccess(userId) {
  const { data, error } = await supabaseAdmin
    .from("seats")
    .select("id, licenses!inner(status)")
    .eq("claimed_by_user_id", userId)
    .eq("licenses.status", "active")
    .limit(1);

  if (error) throw error;
  return (data ?? []).length > 0;
}

export async function getOwnedLicensesWithSeats(userId) {
  const { data, error } = await supabaseAdmin
    .from("licenses")
    .select("*, seats(*)")
    .eq("owner_user_id", userId)
    .order("created_at", { ascending: false })
    .order("created_at", { foreignTable: "seats", ascending: true });

  if (error) throw error;
  return data ?? [];
}

// Mutations — called from API routes, which handle the HTTP status mapping
// for the {error} shape below.
export async function assignSeat({ seatId, ownerUserId, email }) {
  const seat = await findSeatWithLicense(seatId);
  if (!seat) return { error: { status: 404, message: "Seat not found." } };
  if (seat.license.owner_user_id !== ownerUserId) {
    return { error: { status: 403, message: "Forbidden." } };
  }
  if (seat.license.status !== "active") {
    return { error: { status: 400, message: "Subscription is not active." } };
  }
  if (seat.status !== "unclaimed") {
    return { error: { status: 400, message: "Seat is already claimed." } };
  }
  if (seat.invited_email) {
    return { error: { status: 400, message: "Seat already has a pending invite — cancel it first." } };
  }

  const normalizedEmail = email ? email.toLowerCase().trim() : null;

  if (normalizedEmail) {
    const { data: existingUser, error: userError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();
    if (userError) throw userError;

    if (existingUser) {
      const { data: updatedSeat, error: updateError } = await supabaseAdmin
        .from("seats")
        .update({
          status: "claimed",
          claimed_by_user_id: existingUser.id,
          claimed_email: existingUser.email,
          claimed_at: new Date().toISOString(),
        })
        .eq("id", seatId)
        .select()
        .single();
      if (updateError) throw updateError;
      return { data: { seat: updatedSeat, mode: "auto-claimed" } };
    }
  }

  const { data: updatedSeat, error: updateError } = await supabaseAdmin
    .from("seats")
    .update({ invited_email: normalizedEmail })
    .eq("id", seatId)
    .select()
    .single();
  if (updateError) throw updateError;

  return { data: { seat: updatedSeat, mode: "invited" } };
}

export async function peekSeatByCode(code) {
  const normalizedCode = code.trim().toUpperCase();
  const { data, error } = await supabaseAdmin
    .from("seats")
    .select("status, invited_email, license:licenses(status)")
    .eq("redemption_code", normalizedCode)
    .maybeSingle();

  if (error) throw error;
  if (!data || data.status !== "unclaimed" || data.license.status !== "active") return null;
  return { invitedEmail: data.invited_email };
}

export async function claimSeatByCode({ code, userId }) {
  const normalizedCode = code.trim().toUpperCase();

  const { data: seat, error } = await supabaseAdmin
    .from("seats")
    .select("*, license:licenses(*)")
    .eq("redemption_code", normalizedCode)
    .maybeSingle();
  if (error) throw error;

  if (!seat) return { error: { status: 404, message: "Invalid code." } };
  if (seat.license.status !== "active") {
    return { error: { status: 400, message: "This subscription is no longer active." } };
  }
  if (seat.status !== "unclaimed") {
    return { error: { status: 400, message: "This code has already been used." } };
  }

  const { data: user, error: userError } = await supabaseAdmin
    .from("users")
    .select("id, email")
    .eq("id", userId)
    .maybeSingle();
  if (userError) throw userError;
  if (!user) return { error: { status: 404, message: "User not found." } };

  const { data: updatedSeat, error: updateError } = await supabaseAdmin
    .from("seats")
    .update({
      status: "claimed",
      claimed_by_user_id: user.id,
      claimed_email: user.email,
      claimed_at: new Date().toISOString(),
    })
    .eq("id", seat.id)
    .select()
    .single();
  if (updateError) throw updateError;

  return { data: { seat: updatedSeat } };
}

export async function revokeSeat({ seatId, ownerUserId }) {
  const seat = await findSeatWithLicense(seatId);
  if (!seat) return { error: { status: 404, message: "Seat not found." } };
  if (seat.license.owner_user_id !== ownerUserId) {
    return { error: { status: 403, message: "Forbidden." } };
  }

  // Covers both "cancel a pending invite" and "revoke a claimed seat" —
  // either way the seat resets to unclaimed with a fresh code, since the
  // old code (which may already have been emailed out) must die. This is
  // purely our own bookkeeping — there's no external account to deprovision,
  // access is just the claimed-seat check in getMicroLearningsAccess.
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: updatedSeat, error } = await supabaseAdmin
      .from("seats")
      .update({
        status: "unclaimed",
        claimed_by_user_id: null,
        claimed_email: null,
        invited_email: null,
        claimed_at: null,
        redemption_code: generateRedemptionCode(),
      })
      .eq("id", seatId)
      .select()
      .single();

    if (!error) return { data: { seat: updatedSeat } };
    if (error.code !== "23505") throw error;
  }

  throw new Error("Failed to generate a unique redemption code after several attempts.");
}
