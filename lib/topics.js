import { supabaseAdmin } from "@/lib/supabase";

// Only courses with a JollyDeck embed configured belong in the library —
// this view exists specifically to browse gated JollyDeck content by topic.
export async function getTopicsWithCourses() {
  const { data: topics, error: topicsError } = await supabaseAdmin
    .from("topics")
    .select("id, name")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (topicsError) throw topicsError;

  const { data: courses, error: coursesError } = await supabaseAdmin
    .from("courses")
    .select("id, slug, title, type, cover_image_url, topic_id")
    .eq("is_active", true)
    .not("jollydeck_url", "is", null)
    .order("created_at", { ascending: false });
  if (coursesError) throw coursesError;

  return (topics ?? [])
    .map((topic) => ({
      ...topic,
      courses: (courses ?? []).filter((course) => course.topic_id === topic.id),
    }))
    .filter((topic) => topic.courses.length > 0);
}
