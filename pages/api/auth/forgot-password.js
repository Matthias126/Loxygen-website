import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { sendTransactionalEmail, buildPasswordResetEmail } from "@/lib/email";

const APP_URL = process.env.NEXTAUTH_URL;
const TOKEN_TTL_MS = 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  // Always respond the same way whether or not the account exists, so this
  // endpoint can't be used to check which emails have accounts.
  if (user) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const { error } = await supabaseAdmin.from("password_reset_tokens").insert({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    if (!error) {
      const resetUrl = `${APP_URL}/reset-password?token=${rawToken}`;
      await sendTransactionalEmail({
        to: normalizedEmail,
        ...buildPasswordResetEmail({ resetUrl }),
      });
    }
  }

  return res.status(200).json({ ok: true });
}
