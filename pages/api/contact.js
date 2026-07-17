import { Resend } from "resend";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY — cannot send contact email.");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Loxygen Academy <contact@loxygen.world>",
      to: process.env.CONTACT_TO_EMAIL || "geert@loxygen.world",
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
