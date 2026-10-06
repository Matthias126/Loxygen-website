import { requireAdminApi } from "@/lib/requireAdmin";
import { deleteLicense } from "@/lib/licenses";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method === "DELETE") {
    let result;
    try {
      result = await deleteLicense(req.query.id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    return res.status(200).json({ id: result.data.id });
  }

  res.setHeader("Allow", "DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
