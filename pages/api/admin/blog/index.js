import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ posts: data });
  }

  if (req.method === "POST") {
    const {
      slug,
      title,
      excerpt,
      content,
      category,
      cover_image_url,
      cover_image_alt,
      is_published,
      published_at,
    } = req.body ?? {};

    if (!slug || !title || !category) {
      return res.status(400).json({ error: "Slug, title and category are required." });
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt,
        content,
        category,
        cover_image_url: cover_image_url || null,
        cover_image_alt: cover_image_alt || null,
        is_published: Boolean(is_published),
        published_at: is_published ? published_at || new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ post: data });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
