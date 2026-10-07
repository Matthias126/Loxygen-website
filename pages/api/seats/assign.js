import { requireUserApi } from "@/lib/requireUser";
import { assignSeat } from "@/lib/licenses";
import { sendTransactionalEmail, buildSeatInviteEmail, buildSeatAutoClaimedEmail } from "@/lib/email";
import { SITE_URL } from "@/lib/seo";
import { supabaseAdmin } from "@/lib/supabase";

export default async function handler(req, res) {
  const session = await requireUserApi(req, res);
  if (!session) return;

  if (req.method === "POST") {
    const { seatId, email } = req.body ?? {};
    if (!seatId) return res.status(400).json({ error: "seatId is required." });

    let result;
    try {
      result = await assignSeat({ seatId, ownerUserId: session.user.id, email: email || null });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    const { seat, license, mode } = result.data;

    // The person assigning the seat is the licence owner — their name and
    // company go into the email ("Jan from Example Logistics has given you…").
    const { data: owner } = await supabaseAdmin
      .from("users")
      .select("name, business_name")
      .eq("id", session.user.id)
      .maybeSingle();

    const emailDetails = {
      inviterName: owner?.name ?? null,
      companyName: owner?.business_name ?? null,
      expiryDate: license.expires_at,
      renews: license.source === "stripe",
    };

    if (mode === "auto-claimed") {
      const { subject, html } = buildSeatAutoClaimedEmail(emailDetails);
      await sendTransactionalEmail({ to: seat.claimed_email, subject, html });
    } else if (mode === "invited" && seat.invited_email) {
      const redeemUrl = `${SITE_URL}/redeem?code=${seat.redemption_code}`;
      const { subject, html } = buildSeatInviteEmail({
        ...emailDetails,
        code: seat.redemption_code,
        redeemUrl,
        recipientEmail: seat.invited_email,
      });
      await sendTransactionalEmail({ to: seat.invited_email, subject, html });
    }

    return res.status(200).json({ seat });
  }

  res.setHeader("Allow", "POST");
  return res.status(405).json({ error: "Method not allowed" });
}
