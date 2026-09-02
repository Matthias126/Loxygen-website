import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { createLicenseWithSeats } from "@/lib/licenses";
import {
  sendTransactionalEmail,
  buildSeatAutoClaimedEmail,
  buildLicenseConfirmationEmail,
  buildCoursePurchaseConfirmationEmail,
} from "@/lib/email";

export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function handleOneTimePurchase({ userId, courseId, user }) {
  const { data: existingPurchase, error: existingPurchaseError } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();
  if (existingPurchaseError) throw existingPurchaseError;
  if (existingPurchase) return; // already granted — duplicate webhook delivery

  const { data: course, error: courseError } = await supabaseAdmin
    .from("courses")
    .select("title, slug")
    .eq("id", courseId)
    .maybeSingle();
  if (courseError) throw courseError;

  const { error: insertError } = await supabaseAdmin
    .from("purchases")
    .insert({ user_id: userId, course_id: courseId });
  if (insertError) throw insertError;

  if (course) {
    const { subject, html } = buildCoursePurchaseConfirmationEmail({
      courseTitle: course.title,
      courseSlug: course.slug,
    });
    await sendTransactionalEmail({ to: user.email, subject, html });
  }
}

async function handleSubscriptionPurchase({ userId, tierId, session, user }) {
  const { data: existingLicense, error: existingLicenseError } = await supabaseAdmin
    .from("licenses")
    .select("id")
    .eq("stripe_subscription_id", session.subscription)
    .maybeSingle();
  if (existingLicenseError) throw existingLicenseError;
  if (existingLicense) return; // already granted — duplicate webhook delivery

  const { data: tier, error: tierError } = await supabaseAdmin
    .from("course_price_tiers")
    .select("stripe_price_id")
    .eq("id", tierId)
    .maybeSingle();
  if (tierError) throw tierError;

  const { seats } = await createLicenseWithSeats({
    ownerUserId: userId,
    tierId,
    source: "stripe",
    stripeFields: {
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      stripePriceId: tier?.stripe_price_id ?? null,
    },
  });

  if (seats.length === 1) {
    const { error: claimError } = await supabaseAdmin
      .from("seats")
      .update({
        status: "claimed",
        claimed_by_user_id: user.id,
        claimed_email: user.email,
        claimed_at: new Date().toISOString(),
      })
      .eq("id", seats[0].id);
    if (claimError) throw claimError;

    const { subject, html } = buildSeatAutoClaimedEmail();
    await sendTransactionalEmail({ to: user.email, subject, html });
  } else {
    const { subject, html } = buildLicenseConfirmationEmail({ seats });
    await sendTransactionalEmail({ to: user.email, subject, html });
  }
}

async function handleCheckoutCompleted(session) {
  const { userId, courseId, tierId } = session.metadata ?? {};
  if (!userId || !courseId) return;

  const { data: user, error: userError } = await supabaseAdmin
    .from("users")
    .select("id, email")
    .eq("id", userId)
    .maybeSingle();
  if (userError) throw userError;
  if (!user) return;

  if (session.mode === "subscription") {
    await handleSubscriptionPurchase({ userId, tierId, session, user });
  } else {
    await handleOneTimePurchase({ userId, courseId, user });
  }
}

async function handleSubscriptionStatusChange(subscription) {
  const status = ["active", "trialing"].includes(subscription.status) ? "active" : "canceled";
  const { error } = await supabaseAdmin
    .from("licenses")
    .update({ status })
    .eq("stripe_subscription_id", subscription.id);
  if (error) throw error;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error.message);
    return res.status(400).json({ error: "Invalid signature." });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionStatusChange(event.data.object);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`Failed to process Stripe webhook event ${event.type}:`, error);
    return res.status(500).json({ error: "Webhook handler failed." });
  }

  return res.status(200).json({ received: true });
}
