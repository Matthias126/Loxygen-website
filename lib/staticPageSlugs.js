// Split out from lib/staticPages.js so client components (the /admin/pages
// list) can import this plain constant without pulling in lib/supabase.js —
// which reads a server-only secret and crashes if bundled into browser JS.
export const STATIC_PAGE_SLUGS = [
  "young-forwarders-benelux",
  "north-africa-learning-trip-2026",
  "breakbulk-training",
  "bess-logistics-training",
  "e-learning",
  "micro-learnings",
  "sustainable-forwarding",
];
