import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
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
      stripe_price_id,
      is_active,
      available_at,
      cover_image_url,
    } = req.body ?? {};

    if (!slug || !title || !type) {
      return res.status(400).json({ error: "Slug, title and type are required." });
    }

    const { data, error } = await supabaseAdmin
      .from("courses")
      .update({
        slug,
        title,
        description: description || null,
        type,
        price: price || null,
        stripe_price_id: stripe_price_id || null,
        is_active: is_active !== false,
        available_at: available_at || null,
        cover_image_url: cover_image_url || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
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
