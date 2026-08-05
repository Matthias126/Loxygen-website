import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key — every query in this app
// runs server-side (API routes, getServerSideProps, getStaticProps), so
// there's no need for a separate browser/anon client.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
