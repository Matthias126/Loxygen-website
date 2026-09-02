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

// Both flags per slug, for the admin pages list (which needs to render and
// toggle each independently rather than just one boolean).
export async function getStaticPageSettings() {
  const { data, error } = await supabaseAdmin
    .from("static_pages")
    .select("slug, is_active, show_in_navbar");
  if (error) throw error;

  const settings = {};
  for (const slug of STATIC_PAGE_SLUGS) settings[slug] = { is_active: true, show_in_navbar: true };
  for (const row of data ?? []) {
    settings[row.slug] = { is_active: row.is_active, show_in_navbar: row.show_in_navbar };
  }
  return settings;
}

// Separate from is_active (which 404s the page entirely) — this only
// controls whether the page gets a link in the navbar's Academy dropdown,
// so a page can stay live but be decluttered from the top nav.
export async function getNavbarVisibility() {
  const { data, error } = await supabaseAdmin.from("static_pages").select("slug, show_in_navbar");
  if (error) throw error;

  const visibility = {};
  for (const slug of STATIC_PAGE_SLUGS) visibility[slug] = true;
  for (const row of data ?? []) visibility[row.slug] = row.show_in_navbar;
  return visibility;
}
