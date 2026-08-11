import { supabaseAdmin } from "@/lib/supabase";

function mapPost(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.published_at,
    updatedAt: row.updated_at ?? null,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt ?? null,
  };
}

export async function getBlogPosts() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapPost);
}

export async function getBlogPostBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPost(data) : null;
}

export async function getAllBlogSlugs() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true);

  if (error) throw error;
  return (data ?? []).map((post) => post.slug);
}

// Lightweight rows for the sitemap — just the dates, not full post bodies.
export async function getBlogSitemapEntries() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, published_at, updated_at")
    .eq("is_published", true);

  if (error) throw error;
  return (data ?? []).map((row) => ({
    slug: row.slug,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  }));
}
