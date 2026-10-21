import { getBlogPostBySlug } from "@/lib/blog";

// The old GoDaddy site served its blog under /start (/start/f/<slug> for a
// post, /start?blogcategory=… for the filtered index). Google still has those
// URLs indexed, so 301 each one to its /blog equivalent instead of 404ing.
// Old URLs whose new home isn't a same-slug blog post are mapped explicitly
// in next.config.mjs, which runs before this page.
export async function getServerSideProps({ params, query }) {
  const segments = params.path ?? [];
  const slug = segments[segments.length - 1];

  if (slug && slug !== "f") {
    const post = await getBlogPostBySlug(slug);
    if (post) {
      return { redirect: { destination: `/blog/${post.slug}`, statusCode: 301 } };
    }
  }

  const category = typeof query.blogcategory === "string" ? query.blogcategory : null;
  const destination = category ? `/blog?blogcategory=${encodeURIComponent(category)}` : "/blog";
  return { redirect: { destination, statusCode: 301 } };
}

export default function LegacyStartRedirect() {
  return null;
}
