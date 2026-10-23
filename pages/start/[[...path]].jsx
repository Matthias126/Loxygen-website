import { getLegacyBlogRedirect } from "@/lib/legacyRedirects";

// Old GoDaddy blog URLs (/start, /start/f/<slug>) — see lib/legacyRedirects.js.
export const getServerSideProps = getLegacyBlogRedirect;

export default function LegacyStartRedirect() {
  return null;
}
