import { requireAdminApi } from "@/lib/requireAdmin";
import { deleteLicense, extendLicense } from "@/lib/licenses";

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

  if (req.method === "PATCH") {
    if (req.body?.action !== "extend") {
      return res.status(400).json({ error: "Unknown action." });
    }

    let result;
    try {
      result = await extendLicense(req.query.id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    return res.status(200).json({ license: result.data.license });
  }

  res.setHeader("Allow", "DELETE, PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}
