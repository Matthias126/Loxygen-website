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
    ];
  },
};

export default nextConfig;
