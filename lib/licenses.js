import crypto from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import {
  sendTransactionalEmail,
  buildRenewalReminderEmail,
  buildRenewalReminderAdminEmail,
  firstNameOf,
} from "@/lib/email";

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

const LICENSE_TERM_MONTHS = 12;

function oneTermFrom(date) {
  const end = new Date(date);
  end.setMonth(end.getMonth() + LICENSE_TERM_MONTHS);
  return end;
}

// A licence grants access while it's active and — for manually granted
// (bank transfer) licences — until its end date. Stripe licences are kept in
// sync by the subscription webhooks instead, so their expires_at is the next
// renewal date, not a cut-off: a renewal that's a few minutes late reaching
// us must not lock a paying team out.
export function isLicenseLive(license) {
  if (license.status !== "active") return false;
  if (license.source === "stripe" || !license.expires_at) return true;
  return new Date(license.expires_at).getTime() > Date.now();
}

function withLiveness(license) {
  return { ...license, is_live: isLicenseLive(license) };
}

// Stripe API 2025+ moved current_period_end from the subscription onto its
// items; older API versions still have it on the subscription itself.
export function getSubscriptionPeriodEnd(subscription) {
  const seconds =
    subscription.items?.data?.[0]?.current_period_end ?? subscription.current_period_end;
  return seconds ? new Date(seconds * 1000).toISOString() : null;
}

export async function createLicenseWithSeats({
  ownerUserId,
  tierId,
  source = "manual",
  stripeFields = {},
  expiresAt = null,
}) {
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
      expires_at: expiresAt ?? oneTermFrom(new Date()).toISOString(),
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
    .select("id, licenses!inner(status, source, expires_at)")
    .eq("claimed_by_user_id", userId)
    .eq("licenses.status", "active");

  if (error) throw error;
  return (data ?? []).some((seat) => isLicenseLive(seat.licenses));
}

export async function getOwnedLicensesWithSeats(userId) {
  const { data, error } = await supabaseAdmin
    .from("licenses")
    .select("*, seats(*)")
    .eq("owner_user_id", userId)
    .order("created_at", { ascending: false })
    .order("created_at", { foreignTable: "seats", ascending: true });

  if (error) throw error;
  return (data ?? []).map(withLiveness);
}

// Mutations — called from API routes, which handle the HTTP status mapping
// for the {error} shape below.
export async function assignSeat({ seatId, ownerUserId, email }) {
  const seat = await findSeatWithLicense(seatId);
  if (!seat) return { error: { status: 404, message: "Seat not found." } };
  if (seat.license.owner_user_id !== ownerUserId) {
    return { error: { status: 403, message: "Forbidden." } };
  }
  if (!isLicenseLive(seat.license)) {
    return { error: { status: 400, message: "This licence is not active." } };
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
      return { data: { seat: updatedSeat, license: seat.license, mode: "auto-claimed" } };
    }
  }

  const { data: updatedSeat, error: updateError } = await supabaseAdmin
    .from("seats")
    .update({ invited_email: normalizedEmail })
    .eq("id", seatId)
    .select()
    .single();
  if (updateError) throw updateError;

  return { data: { seat: updatedSeat, license: seat.license, mode: "invited" } };
}

export async function peekSeatByCode(code) {
  const normalizedCode = code.trim().toUpperCase();
  const { data, error } = await supabaseAdmin
    .from("seats")
    .select("status, invited_email, license:licenses(status, source, expires_at)")
    .eq("redemption_code", normalizedCode)
    .maybeSingle();

  if (error) throw error;
  if (!data || data.status !== "unclaimed" || !isLicenseLive(data.license)) return null;
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
  if (!isLicenseLive(seat.license)) {
    return { error: { status: 400, message: "This licence is no longer active." } };
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

  return resetSeat(seatId);
}

// Admin variant of revokeSeat — no ownership check, requireAdminApi gates it.
export async function adminRevokeSeat(seatId) {
  const seat = await findSeatWithLicense(seatId);
  if (!seat) return { error: { status: 404, message: "Seat not found." } };

  return resetSeat(seatId);
}

async function resetSeat(seatId) {
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

async function isStripeSubscriptionBilling(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return !["canceled", "incomplete_expired"].includes(subscription.status);
  } catch (error) {
    // Subscriptions made in Stripe test mode don't exist under the live key.
    if (error.code === "resource_missing") return false;
    throw error;
  }
}

export async function deleteLicense(licenseId) {
  const { data: license, error } = await supabaseAdmin
    .from("licenses")
    .select("id, stripe_subscription_id")
    .eq("id", licenseId)
    .maybeSingle();
  if (error) throw error;
  if (!license) return { error: { status: 404, message: "License not found." } };

  // Deleting the row doesn't stop Stripe from charging the customer.
  if (license.stripe_subscription_id && (await isStripeSubscriptionBilling(license.stripe_subscription_id))) {
    return {
      error: {
        status: 409,
        message: "This license still has an active Stripe subscription. Cancel it in Stripe first, then delete.",
      },
    };
  }

  const { error: seatsError } = await supabaseAdmin.from("seats").delete().eq("license_id", licenseId);
  if (seatsError) throw seatsError;

  const { error: licenseError } = await supabaseAdmin.from("licenses").delete().eq("id", licenseId);
  if (licenseError) throw licenseError;

  return { data: { id: licenseId } };
}

// Admin: a manual licence's renewal has been paid — push its end date one term
// further, counted from today if it had already lapsed.
export async function extendLicense(licenseId) {
  const { data: license, error } = await supabaseAdmin
    .from("licenses")
    .select("id, source, expires_at")
    .eq("id", licenseId)
    .maybeSingle();
  if (error) throw error;
  if (!license) return { error: { status: 404, message: "License not found." } };
  if (license.source === "stripe") {
    return { error: { status: 400, message: "Card subscriptions renew through Stripe." } };
  }

  const current = license.expires_at ? new Date(license.expires_at) : new Date();
  const base = current.getTime() > Date.now() ? current : new Date();

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("licenses")
    // Clearing reminder_sent_at re-arms next year's renewal reminder.
    .update({ expires_at: oneTermFrom(base).toISOString(), reminder_sent_at: null })
    .eq("id", licenseId)
    .select()
    .single();
  if (updateError) throw updateError;

  return { data: { license: withLiveness(updated) } };
}

const REMINDER_DAYS_BEFORE = 30;
const SUPPORT_EMAIL = "geert@loxygen.world";

// Daily cron (/api/cron/licence-reminders): one renewal reminder per manual
// (bank transfer) licence, about a month before it ends — to the buyer, with
// replies going to Geert, plus a plain notice to Geert. Stripe licences are
// skipped: they renew through Stripe. reminder_sent_at is only set once the
// buyer's email actually went out, so a failed send is retried the next day.
export async function sendRenewalReminders() {
  const now = new Date();
  const horizon = new Date(now.getTime() + REMINDER_DAYS_BEFORE * 24 * 60 * 60 * 1000);

  const { data: licenses, error } = await supabaseAdmin
    .from("licenses")
    .select("id, owner_user_id, seat_count, expires_at, seats(status)")
    .neq("source", "stripe")
    .eq("status", "active")
    .is("reminder_sent_at", null)
    .gt("expires_at", now.toISOString())
    .lte("expires_at", horizon.toISOString());
  if (error) throw error;
  if (!licenses?.length) return { sent: 0, failed: 0 };

  const ownerIds = [...new Set(licenses.map((license) => license.owner_user_id))];
  const { data: owners, error: ownersError } = await supabaseAdmin
    .from("users")
    .select("id, email, name, business_name")
    .in("id", ownerIds);
  if (ownersError) throw ownersError;
  const ownerById = new Map((owners ?? []).map((owner) => [owner.id, owner]));

  let sent = 0;
  let failed = 0;

  for (const license of licenses) {
    const owner = ownerById.get(license.owner_user_id);
    if (!owner) {
      failed += 1;
      continue;
    }

    const seatsInUse = (license.seats ?? []).filter((seat) => seat.status === "claimed").length;
    const reminder = buildRenewalReminderEmail({
      firstName: firstNameOf(owner.name),
      companyName: owner.business_name,
      seatCount: license.seat_count,
      seatsInUse,
      expiryDate: license.expires_at,
    });
    const { ok } = await sendTransactionalEmail({ to: owner.email, replyTo: SUPPORT_EMAIL, ...reminder });
    if (!ok) {
      failed += 1;
      continue;
    }

    const { error: updateError } = await supabaseAdmin
      .from("licenses")
      .update({ reminder_sent_at: now.toISOString() })
      .eq("id", license.id);
    if (updateError) throw updateError;
    sent += 1;

    if (process.env.CONTACT_TO_EMAIL) {
      await sendTransactionalEmail({
        to: process.env.CONTACT_TO_EMAIL,
        ...buildRenewalReminderAdminEmail({
          ownerName: owner.name,
          ownerEmail: owner.email,
          companyName: owner.business_name,
          seatCount: license.seat_count,
          expiryDate: license.expires_at,
        }),
      });
    }
  }

  return { sent, failed };
}
