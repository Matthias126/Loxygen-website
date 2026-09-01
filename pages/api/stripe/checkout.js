import { requireUserApi } from "@/lib/requireUser";
import { getCourseBySlug } from "@/lib/courses";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

// SITE_URL (lib/seo.js) is hardcoded to the production domain for SEO tags —
// wrong for checkout redirects, which need to land back on whichever
// environment this request is actually running in.
const APP_URL = process.env.NEXTAUTH_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await requireUserApi(req, res);
  if (!session) return;

  const { slug, tierId } = req.body ?? {};
  if (!slug) return res.status(400).json({ error: "slug is required." });

  const course = await getCourseBySlug(slug);
  if (!course || !course.is_active) {
    return res.status(404).json({ error: "Course not found." });
  }

  const isTeamPlan = course.type === "micro-learning-team";
  let priceId = course.stripe_price_id;

  if (tierId) {
    const tier = course.tiers?.find((item) => item.id === tierId);
    if (!tier) return res.status(400).json({ error: "Invalid tier." });
    priceId = tier.stripe_price_id;
  } else if (isTeamPlan) {
    return res.status(400).json({ error: "A tier is required for this plan." });
  }

  if (!priceId) {
    return res.status(400).json({ error: "This course isn't available for checkout yet." });
  }

  if (!isTeamPlan) {
    const { data: existingPurchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", course.id)
      .maybeSingle();
    if (existingPurchase) {
      return res.status(400).json({ error: "You already own this course." });
    }
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: isTeamPlan ? "subscription" : "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: session.user.email,
    client_reference_id: session.user.id,
    // Prices are flat, manually-set "excl. VAT" amounts — this site doesn't
    // use Stripe Tax, so Managed Payments' tax-code requirement doesn't apply.
    managed_payments: { enabled: false },
    metadata: {
      userId: session.user.id,
      courseId: course.id,
      tierId: tierId ?? "",
    },
    success_url: `${APP_URL}/account?checkout=success`,
    cancel_url: `${APP_URL}/courses/${course.slug}`,
  });

  return res.status(200).json({ url: checkoutSession.url });
}
