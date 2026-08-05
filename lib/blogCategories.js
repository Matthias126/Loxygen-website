// Split out from lib/blog.js so client components (CategoryFilter,
// BlogPostForm) can import this plain constant without pulling in
// lib/supabase.js — which reads a server-only secret and crashes if
// bundled into browser JS.
export const BLOG_CATEGORIES = [
  "AI",
  "Breakbulk",
  "Learning",
  "Omnibus",
  "Strategy",
  "Sustainable logistics",
  "Technology",
];
