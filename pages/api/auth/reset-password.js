import crypto from "crypto";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, password } = req.body ?? {};
  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const { data: resetToken } = await supabaseAdmin
    .from("password_reset_tokens")
    .select("id, user_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (
    !resetToken ||
    resetToken.used_at ||
    new Date(resetToken.expires_at).getTime() < Date.now()
  ) {
    return res.status(400).json({ error: "This reset link is invalid or has expired." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ password_hash: passwordHash })
    .eq("id", resetToken.user_id);

  if (updateError) {
    return res.status(500).json({ error: "Failed to reset password." });
  }

  await supabaseAdmin
    .from("password_reset_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", resetToken.id);

  return res.status(200).json({ ok: true });
}
