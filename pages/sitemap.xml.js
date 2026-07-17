import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/seo";

const EXCLUDED_PAGES = new Set(["_app", "_document", "404", "sitemap.xml"]);
const GATED_PAGES = new Set(["e-learning", "account"]);

function getStaticRoutes() {
  const pagesDir = path.join(process.cwd(), "pages");

  return fs
    .readdirSync(pagesDir)
    .filter((file) => /\.jsx?$/.test(file))
    .map((file) => file.replace(/\.jsx?$/, ""))
    .filter((name) => !EXCLUDED_PAGES.has(name) && !GATED_PAGES.has(name))
    .map((name) => (name === "index" ? "" : `/${name}`));
}

function buildSitemap(routes) {
  const urls = routes
    .map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export async function getServerSideProps({ res }) {
  const routes = getStaticRoutes();

  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap(routes));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
