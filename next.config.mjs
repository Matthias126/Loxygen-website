/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  async redirects() {
    return [
      // loxygen.world (bare domain) is canonical everywhere else in the
      // codebase (SITE_URL) — redirect www so Google doesn't index both as
      // separate pages.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.loxygen.world" }],
        destination: "https://loxygen.world/:path*",
        permanent: true,
      },
      // North Africa Learning Trip 2026 replaced "Africa Roadtrip 2026" —
      // that name now belongs to a separate February trip.
      {
        source: "/africa-roadtrip-2026",
        destination: "/north-africa-learning-trip-2026",
        permanent: true,
      },
      {
        source: "/north-africa-tour-2026",
        destination: "/north-africa-learning-trip-2026",
        permanent: true,
      },
      // Old GoDaddy URLs still indexed by Google (Search Console → "Not
      // found (404)"). Explicit 301s rather than `permanent` (308) since
      // that's what SEO tools check for. Any old blog URL (/start/..., /f/...)
      // not listed here falls through to lib/legacyRedirects.js, which matches
      // it to a blog post by slug.
      {
        source: "/battery-energy-logistics",
        destination: "/bess-logistics-training",
        statusCode: 301,
      },
      {
        source: "/breakbulk-rotterdam",
        destination: "/breakbulk-training",
        statusCode: 301,
      },
      {
        source: "/breakbulk",
        destination: "/breakbulk-training",
        statusCode: 301,
      },
      // Old GoDaddy online store (/ols/products/<product>).
      {
        source: "/ols/products/incoterms-2020",
        destination: "/courses/mastering-incoterms-2020-for-cross-border-delivery-teams",
        statusCode: 301,
      },
      {
        source: "/ols/products/europe-learning-tour-live-7-12062026-benelux",
        destination: "/courses/benelux-immersion-week",
        statusCode: 301,
      },
      {
        source: "/ols/:path*",
        destination: "/e-learning",
        statusCode: 301,
      },
      {
        source: "/start/f/the-2025-loxygen-sustainability-award-goes-to-zufall",
        destination: "/sustainable-forwarding",
        statusCode: 301,
      },
      {
        source: "/africa-road-trip",
        destination: "/north-africa-learning-trip-2026",
        statusCode: 301,
      },
      // No equivalent on the new site — homepage rather than a 404.
      {
        source: "/tribes-explained",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/share-your-expertise-1",
        destination: "/share-your-expertise",
        statusCode: 301,
      },
      {
        source: "/m/login",
        destination: "/login",
        statusCode: 301,
      },
      {
        source: "/m/create-account",
        destination: "/signup",
        statusCode: 301,
      },
      // Course slug typo, corrected in the Supabase courses table.
      {
        source: "/courses/mastering-trade-documnetation-for-logistics-coordinators",
        destination: "/courses/mastering-trade-documentation-for-logistics-coordinators",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
