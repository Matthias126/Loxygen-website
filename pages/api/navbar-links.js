import { getNavbarVisibility } from "@/lib/staticPages";
import { getNavbarCourses } from "@/lib/courses";

// Public — the navbar renders on every page for every visitor, so this just
// exposes which flagship pages Geert has hidden from the dropdown, plus any
// courses he's opted into it. No auth-gated data involved.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const [visibility, courses] = await Promise.all([getNavbarVisibility(), getNavbarCourses()]);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json({ visibility, courses });
}
