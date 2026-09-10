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
    ];
  },
};

export default nextConfig;
