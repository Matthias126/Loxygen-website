import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/seo";
import { getBlogSitemapEntries } from "@/lib/blog";
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
    .map((name) => ({ loc: name === "index" ? "" : `/${name}` }));

  const blogEntries = await getBlogSitemapEntries();
  const blogRoutes = [
    { loc: "/blog" },
    ...blogEntries.map((entry) => ({
      loc: `/blog/${entry.slug}`,
      lastmod: entry.updatedAt || entry.publishedAt,
    })),
  ];

  const courses = await getCourses();
  const courseRoutes = courses.map((course) => ({ loc: `/courses/${course.slug}` }));

  return [...topLevelRoutes, ...blogRoutes, ...courseRoutes];
}

function buildSitemap(routes) {
  const urls = routes
    .map((route) => {
      const lastmod = route.lastmod
        ? `<lastmod>${new Date(route.lastmod).toISOString().slice(0, 10)}</lastmod>`
        : "";
      return `  <url><loc>${SITE_URL}${route.loc}</loc>${lastmod}</url>`;
    })
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
