import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { peekSeatByCode, claimSeatByCode } from "@/lib/licenses";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "code is required." });

    let peek;
    try {
      peek = await peekSeatByCode(code);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!peek) return res.status(404).json({ error: "Invalid or already-used code." });
    return res.status(200).json(peek);
  }

  if (req.method === "POST") {
    const { code, email, password } = req.body ?? {};
    if (!code) return res.status(400).json({ error: "code is required." });

    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.id) {
      let result;
      try {
        result = await claimSeatByCode({ code, userId: session.user.id });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.error) return res.status(result.error.status).json({ error: result.error.message });
      return res.status(200).json({ ok: true });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required to create an account." });
    }

    let peek;
    try {
      peek = await peekSeatByCode(code);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!peek) return res.status(404).json({ error: "Invalid or already-used code." });

    const accountEmail = (peek.invitedEmail || email || "").toLowerCase().trim();
    if (!accountEmail) {
      return res.status(400).json({ error: "Email is required." });
    }

    const { data: existingUser, error: existingUserError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", accountEmail)
      .maybeSingle();
    if (existingUserError) return res.status(500).json({ error: existingUserError.message });

    if (existingUser) {
      return res.status(409).json({
        error: "An account already exists for this email — log in first, then redeem the code from your account.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { data: newUser, error: createError } = await supabaseAdmin
      .from("users")
      .insert({ email: accountEmail, password_hash: passwordHash, is_admin: false })
      .select("id")
      .single();
    if (createError) return res.status(500).json({ error: createError.message });

    let result;
    try {
      result = await claimSeatByCode({ code, userId: newUser.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.error) return res.status(result.error.status).json({ error: result.error.message });

    return res.status(200).json({ ok: true, email: accountEmail });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
