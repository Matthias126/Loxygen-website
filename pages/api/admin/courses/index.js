import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ courses: data });
  }

  if (req.method === "POST") {
    const {
      slug,
      title,
      description,
      type,
      price,
      stripe_price_id,
      is_active,
      show_in_upcoming,
      available_at,
      cover_image_url,
    } = req.body ?? {};

    if (!slug || !title || !type) {
      return res.status(400).json({ error: "Slug, title and type are required." });
    }

    const isActive = is_active !== false;

    const { data, error } = await supabaseAdmin
      .from("courses")
      .insert({
        slug,
        title,
        description: description || null,
        type,
        price: price || null,
        stripe_price_id: stripe_price_id || null,
        is_active: isActive,
        show_in_upcoming: isActive && show_in_upcoming === true,
        available_at: available_at || null,
        cover_image_url: cover_image_url || null,
      })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ course: data });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
