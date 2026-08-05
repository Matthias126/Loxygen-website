import { supabaseAdmin } from "@/lib/supabase";
import { STATIC_PAGE_SLUGS } from "@/lib/staticPageSlugs";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  const { slug } = req.query;

  if (!STATIC_PAGE_SLUGS.includes(slug)) {
    return res.status(400).json({ error: "Unknown page." });
  }

  if (req.method === "PATCH") {
    const { is_active } = req.body ?? {};

    const { data, error } = await supabaseAdmin
      .from("static_pages")
      .upsert({ slug, is_active: Boolean(is_active) }, { onConflict: "slug" })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ page: data });
  }

  res.setHeader("Allow", "PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}
