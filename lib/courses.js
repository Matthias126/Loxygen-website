import { supabaseAdmin } from "@/lib/supabase";

const COURSE_SELECT = "*, tiers:course_price_tiers(*)";

function withSortedTiers(course) {
  if (!course?.tiers) return course;
  return { ...course, tiers: [...course.tiers].sort((a, b) => a.sort_order - b.sort_order) };
}

// jollydeck_url is only ever meant to reach the browser for a verified
// purchaser of that specific course (checked in the [slug] page's
// getServerSideProps) — every listing helper below strips it so it can
// never leak through a course card or catalogue page.
function withoutPrivateFields(course) {
  if (!course) return course;
  // eslint-disable-next-line no-unused-vars -- destructuring to omit the field
  const { jollydeck_url, ...rest } = course;
  return rest;
}

export async function getCourses({ type, activeOnly = true } = {}) {
  let query = supabaseAdmin
    .from("courses")
    .select(COURSE_SELECT)
    .order("created_at", { ascending: false });

  if (activeOnly) query = query.eq("is_active", true);
  if (type) query = query.eq("type", type);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(withSortedTiers).map(withoutPrivateFields);
}

export async function getUpcomingCourses() {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select(COURSE_SELECT)
    .eq("is_active", true)
    .eq("show_in_upcoming", true)
    .order("available_at", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return (data ?? []).map(withSortedTiers).map(withoutPrivateFields);
}

export async function getNavbarCourses() {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("slug, title")
    .eq("is_active", true)
    .eq("show_in_navbar", true)
    .order("title", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getCourseBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select(COURSE_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return withSortedTiers(data);
}
