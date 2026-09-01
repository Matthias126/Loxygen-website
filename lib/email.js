import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendTransactionalEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.error(`Missing RESEND_API_KEY — cannot send email "${subject}" to ${to}.`);
    return { ok: false };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      // Overridable for local dev — Resend's sandbox sender doesn't need a
      // verified domain, but only delivers to the address the API key's
      // account is registered under.
      from: process.env.EMAIL_FROM_OVERRIDE || "Loxygen Academy <contact@loxygen.world>",
      to,
      ...(replyTo ? { replyTo } : {}),
      subject,
      html,
    });

    // The SDK resolves (rather than throws) on API-level failures like an
    // invalid key or unverified domain, so that has to be checked explicitly
    // or a bad key silently reports success.
    if (error) {
      console.error(`Failed to send email "${subject}" to ${to}:`, error);
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error(`Failed to send email "${subject}" to ${to}:`, error);
    return { ok: false };
  }
}

export function buildSeatInviteEmail({ redeemUrl }) {
  return {
    subject: "You've been given access to Loxygen Academy micro-learnings",
    html: `
      <p>Someone has given you access to Loxygen Academy's micro-learning modules.</p>
      <p><a href="${escapeHtml(redeemUrl)}">Click here to set up your account</a> and start learning.</p>
    `,
  };
}

export function buildSeatAutoClaimedEmail() {
  return {
    subject: "You now have access to Loxygen Academy micro-learnings",
    html: `
      <p>Your existing Loxygen Academy account now has access to the micro-learning library.</p>
      <p><a href="${escapeHtml(SITE_URL)}/micro-learnings/library">Browse the library</a>.</p>
    `,
  };
}

export function buildCoursePurchaseConfirmationEmail({ courseTitle, courseSlug }) {
  return {
    subject: `Your purchase is confirmed: ${courseTitle}`,
    html: `
      <p>Thanks for your purchase! You now have access to <strong>${escapeHtml(courseTitle)}</strong>.</p>
      <p><a href="${escapeHtml(SITE_URL)}/courses/${escapeHtml(courseSlug)}">Start learning</a> any time from your account.</p>
    `,
  };
}

export function buildNewAccountAdminEmail({ name, email, businessName, country, network }) {
  return {
    subject: `New Loxygen Academy account: ${name}`,
    html: `
      <p>A new account was just created on Loxygen Academy.</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Business name:</strong> ${escapeHtml(businessName)}</p>
      <p><strong>Country:</strong> ${escapeHtml(country)}</p>
      <p><strong>Network:</strong> ${escapeHtml(network)}</p>
    `,
  };
}

export function buildLicenseConfirmationEmail({ seats }) {
  const rows = seats
    .filter((seat) => seat.status === "unclaimed")
    .map(
      (seat) =>
        `<li>${seat.invited_email ? escapeHtml(seat.invited_email) : "Unassigned"} — code: <strong>${escapeHtml(seat.redemption_code)}</strong></li>`
    )
    .join("");

  return {
    subject: "Your Loxygen Academy micro-learnings seats",
    html: `
      <p>Thanks for your purchase. Here are the access codes for all ${seats.length} seat${seats.length === 1 ? "" : "s"}:</p>
      <ul>${rows}</ul>
      <p>Manage your team anytime at <a href="${escapeHtml(SITE_URL)}/account/team">${escapeHtml(SITE_URL)}/account/team</a>.</p>
    `,
  };
}
