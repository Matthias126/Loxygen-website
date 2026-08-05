import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ post: data });
  }

  if (req.method === "PUT") {
    const {
      slug,
      title,
      excerpt,
      content,
      category,
      cover_image_url,
      is_published,
      published_at,
    } = req.body ?? {};

    if (!slug || !title || !category) {
      return res.status(400).json({ error: "Slug, title and category are required." });
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        slug,
        title,
        excerpt,
        content,
        category,
        cover_image_url: cover_image_url || null,
        is_published: Boolean(is_published),
        published_at: is_published ? published_at || new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ post: data });
  }

  if (req.method === "DELETE") {
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
