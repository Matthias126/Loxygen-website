import { supabaseAdmin } from "@/lib/supabase";

export async function getCourses({ type, activeOnly = true } = {}) {
  let query = supabaseAdmin.from("courses").select("*").order("created_at", { ascending: false });

  if (activeOnly) query = query.eq("is_active", true);
  if (type) query = query.eq("type", type);

  const { data, error } = await query;
  if (error) throw error;

  return data ?? [];
}

export async function getUpcomingCourses() {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .eq("show_in_upcoming", true)
    .order("available_at", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCourseBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}
