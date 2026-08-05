import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/seo";
import { getAllBlogSlugs } from "@/lib/blog";
import { getCourses } from "@/lib/courses";

const EXCLUDED_PAGES = new Set(["_app", "_document", "404", "sitemap.xml"]);
const GATED_PAGES = new Set(["e-learning", "account"]);

async function getStaticRoutes() {
  const pagesDir = path.join(process.cwd(), "pages");

  const topLevelRoutes = fs
    .readdirSync(pagesDir)
    .filter((file) => /\.jsx?$/.test(file))
    .map((file) => file.replace(/\.jsx?$/, ""))
    .filter((name) => !EXCLUDED_PAGES.has(name) && !GATED_PAGES.has(name))
    .map((name) => (name === "index" ? "" : `/${name}`));

  const slugs = await getAllBlogSlugs();
  const blogRoutes = ["/blog", ...slugs.map((slug) => `/blog/${slug}`)];

  const courses = await getCourses();
  const courseRoutes = courses.map((course) => `/courses/${course.slug}`);

  return [...topLevelRoutes, ...blogRoutes, ...courseRoutes];
}

function buildSitemap(routes) {
  const urls = routes
    .map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export async function getServerSideProps({ res }) {
  const routes = await getStaticRoutes();

  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap(routes));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
