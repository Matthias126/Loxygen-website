import { requireUserApi } from "@/lib/requireUser";
import { getOwnedLicensesWithSeats } from "@/lib/licenses";

export default async function handler(req, res) {
  const session = await requireUserApi(req, res);
  if (!session) return;

  if (req.method === "GET") {
    try {
      const licenses = await getOwnedLicensesWithSeats(session.user.id);
      return res.status(200).json({ licenses });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", "GET");
  return res.status(405).json({ error: "Method not allowed" });
}
