import { requireUserApi } from "@/lib/requireUser";
import { revokeSeat } from "@/lib/licenses";

export default async function handler(req, res) {
  const session = await requireUserApi(req, res);
  if (!session) return;

  if (req.method === "POST") {
    const { seatId } = req.body ?? {};
    if (!seatId) return res.status(400).json({ error: "seatId is required." });

    let result;
    try {
      result = await revokeSeat({ seatId, ownerUserId: session.user.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    return res.status(200).json({ seat: result.data.seat });
  }

  res.setHeader("Allow", "POST");
  return res.status(405).json({ error: "Method not allowed" });
}
