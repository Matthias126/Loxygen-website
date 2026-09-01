import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*, tiers:course_price_tiers(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ course: data });
  }

  if (req.method === "PUT") {
    const {
      slug,
      title,
      description,
      type,
      price,
      price_note,
      rating,
      stripe_price_id,
      is_active,
      show_in_upcoming,
      available_at,
      registration_deadline,
      cover_image_url,
      jollydeck_url,
      topic_id,
      tiers,
    } = req.body ?? {};

    if (!slug || !title || !type) {
      return res.status(400).json({ error: "Slug, title and type are required." });
    }

    const isActive = is_active !== false;

    const { data, error } = await supabaseAdmin
      .from("courses")
      .update({
        slug,
        title,
        description: description || null,
        type,
        price: price || null,
        price_note: price_note || null,
        rating: rating || null,
        stripe_price_id: stripe_price_id || null,
        is_active: isActive,
        show_in_upcoming: isActive && show_in_upcoming === true,
        available_at: available_at || null,
        registration_deadline: registration_deadline || null,
        cover_image_url: cover_image_url || null,
        jollydeck_url: jollydeck_url || null,
        topic_id: topic_id || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    if (Array.isArray(tiers)) {
      const { error: deleteError } = await supabaseAdmin
        .from("course_price_tiers")
        .delete()
        .eq("course_id", id);
      if (deleteError) return res.status(500).json({ error: deleteError.message });

      if (tiers.length > 0) {
        const { error: tiersError } = await supabaseAdmin.from("course_price_tiers").insert(
          tiers.map((tier, index) => ({
            course_id: id,
            label: tier.label,
            price: tier.price,
            price_note: tier.price_note || null,
            stripe_price_id: tier.stripe_price_id || null,
            seat_count: tier.seat_count || null,
            sort_order: index,
          }))
        );
        if (tiersError) return res.status(500).json({ error: tiersError.message });
      }
    }

    return res.status(200).json({ course: data });
  }

  if (req.method === "DELETE") {
    const { error } = await supabaseAdmin.from("courses").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
