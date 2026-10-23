import { getLegacyBlogRedirect } from "@/lib/legacyRedirects";

// Old GoDaddy blog post URLs without the /start prefix (/f/<slug>) — see
// lib/legacyRedirects.js.
export const getServerSideProps = getLegacyBlogRedirect;

export default function LegacyPostRedirect() {
  return null;
}
