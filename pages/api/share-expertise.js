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

  const { name, email, company, expertise, message } = req.body ?? {};

  if (!name || !email || !expertise || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, area of expertise and message are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY — cannot send share-your-expertise email.");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Loxygen Academy <contact@loxygen.world>",
      to: process.env.CONTACT_TO_EMAIL || "geert@loxygen.world",
      replyTo: email,
      subject: `New "Share your expertise" submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Area of expertise:</strong> ${escapeHtml(expertise)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    // The SDK resolves (rather than throws) on API-level failures like an
    // invalid key or unverified domain, so that has to be checked explicitly.
    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send share-your-expertise email:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
