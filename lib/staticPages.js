import { supabaseAdmin } from "@/lib/supabase";
import { STATIC_PAGE_SLUGS } from "@/lib/staticPageSlugs";

export async function isStaticPageActive(slug) {
  const { data, error } = await supabaseAdmin
    .from("static_pages")
    .select("is_active")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data?.is_active ?? true;
}

export async function getStaticPageVisibility() {
  const { data, error } = await supabaseAdmin.from("static_pages").select("slug, is_active");
  if (error) throw error;

  const visibility = {};
  for (const slug of STATIC_PAGE_SLUGS) visibility[slug] = true;
  for (const row of data ?? []) visibility[row.slug] = row.is_active;
  return visibility;
}
