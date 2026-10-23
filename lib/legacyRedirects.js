import { getBlogPostBySlug } from "@/lib/blog";

// The old GoDaddy site served its blog under /start (/start/f/<slug> for a
// post, /start?blogcategory=… for the filtered index), and also linked posts
// as plain /f/<slug>. Google still has those URLs indexed, so 301 each one to
// its new equivalent instead of 404ing. Other old URLs are mapped explicitly
// in next.config.mjs, which runs before these pages.

// Old posts whose slug changed when they were moved to the new blog.
const RENAMED_POSTS = {
  "building-learning-capital-for-the-next-logistics-generation":
    "building-learning-capital-for-the-next-generation-in-logistics",
};

// Old posts that were deliberately not carried over — 404 so Google drops
// them, rather than redirecting to an unrelated page.
const REMOVED_POSTS = new Set([
  "the-breakbulk-renaissance-why-human-expertise-still-matters",
  "eus-omnibus-package-simplifying-sustainability-reporting",
  "stop-waiting-and-start-shaping",
]);

// GoDaddy kept typographic hyphens (e.g. U+2011 non-breaking hyphen) in some
// slugs; the new slugs use plain ASCII hyphens.
function normalizeSlug(slug) {
  return slug.replace(/[‐-―]/g, "-").toLowerCase();
}

export async function getLegacyBlogRedirect({ params, query }) {
  const segments = params.path ?? [];
  const last = segments[segments.length - 1];
  const slug = last && last !== "f" ? normalizeSlug(last) : null;

  if (slug) {
    if (REMOVED_POSTS.has(slug)) return { notFound: true };

    const post = await getBlogPostBySlug(RENAMED_POSTS[slug] ?? slug);
    if (post) {
      return { redirect: { destination: `/blog/${post.slug}`, statusCode: 301 } };
    }
  }

  const category = typeof query.blogcategory === "string" ? query.blogcategory : null;
  const destination = category ? `/blog?blogcategory=${encodeURIComponent(category)}` : "/blog";
  return { redirect: { destination, statusCode: 301 } };
}
