import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { sendTransactionalEmail, buildNewAccountAdminEmail } from "@/lib/email";
import { NETWORK_OPTIONS } from "@/lib/networks";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password, business_name, country, network } = req.body ?? {};

  if (!name || !email || !password || !business_name || !country || !network) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!NETWORK_OPTIONS.includes(network)) {
    return res.status(400).json({ error: "Invalid network selection." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { error } = await supabaseAdmin.from("users").insert({
    email: normalizedEmail,
    password_hash: passwordHash,
    name,
    business_name,
    country,
    network,
    is_admin: false,
  });

  if (error) {
    return res.status(500).json({ error: "Failed to create account." });
  }

  await sendTransactionalEmail({
    to: process.env.CONTACT_TO_EMAIL || "geert@loxygen.world",
    ...buildNewAccountAdminEmail({
      name,
      email: normalizedEmail,
      businessName: business_name,
      country,
      network,
    }),
  });

  return res.status(201).json({ ok: true });
}
