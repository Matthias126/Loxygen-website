import { sendRenewalReminders } from "@/lib/licenses";

// Called once a day by Vercel Cron (see vercel.json). Vercel sends
// "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set on the project.
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await sendRenewalReminders();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Licence renewal reminders failed:", error);
    return res.status(500).json({ error: error.message });
  }
}
