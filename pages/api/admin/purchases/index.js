import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data: purchases, error } = await supabaseAdmin
    .from("purchases")
    .select("id, purchased_at, user_id, course:courses(id, title, slug, type), tier:course_price_tiers(id, label)")
    .order("purchased_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const userIds = [...new Set((purchases ?? []).map((purchase) => purchase.user_id))];
  const { data: buyers, error: buyersError } = await supabaseAdmin
    .from("users")
    .select("id, name, email")
    .in("id", userIds.length > 0 ? userIds : ["00000000-0000-0000-0000-000000000000"]);

  if (buyersError) return res.status(500).json({ error: buyersError.message });

  const buyerById = new Map((buyers ?? []).map((buyer) => [buyer.id, buyer]));
  const purchasesWithBuyer = (purchases ?? []).map((purchase) => ({
    ...purchase,
    buyer: buyerById.get(purchase.user_id) ?? null,
  }));

  return res.status(200).json({ purchases: purchasesWithBuyer });
}
