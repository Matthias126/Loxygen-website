import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

// ── Branded customer emails ──────────────────────────────────────────────────
// Table layout + inline styles only — email clients (Outlook especially)
// ignore <style> blocks, flexbox and most CSS. The wordmark is live text, not
// an image, so it survives image blocking. The admin notifications at the
// bottom of this file stay plain on purpose.

const NAVY = "#023560";
const TEXT = "#334155";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
const SUPPORT_EMAIL = "geert@loxygen.world";

function formatEmailDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function firstNameOf(fullName) {
  return fullName ? fullName.trim().split(/\s+/)[0] : null;
}

function paragraph(html) {
  return `<p style="margin:0 0 16px;font:15px/24px ${FONT};color:${TEXT};">${html}</p>`;
}

function heading(text) {
  return `<h2 style="margin:32px 0 12px;font:bold 17px/24px ${FONT};color:${NAVY};">${escapeHtml(text)}</h2>`;
}

function strong(text) {
  return `<strong style="color:${NAVY};">${text}</strong>`;
}

function steps(items) {
  const rows = items
    .map(
      (item, index) => `
        <tr>
          <td valign="top" style="padding:0 14px 14px 0;width:28px;">
            <div style="width:28px;height:28px;border-radius:14px;background:${NAVY};color:#ffffff;font:bold 13px/28px ${FONT};text-align:center;">${index + 1}</div>
          </td>
          <td valign="top" style="padding:3px 0 14px;font:15px/24px ${FONT};color:${TEXT};">${item}</td>
        </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;">${rows}</table>`;
}

function bullets(items) {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td valign="top" style="padding:0 10px 8px 0;font:15px/24px ${FONT};color:${NAVY};">•</td>
          <td valign="top" style="padding:0 0 8px;font:15px/24px ${FONT};color:${TEXT};">${item}</td>
        </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

function button(href, label) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
      <tr>
        <td style="border-radius:8px;background:${NAVY};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font:bold 15px/20px ${FONT};color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

function link(href, label) {
  return `<a href="${escapeHtml(href)}" style="color:${NAVY};font-weight:bold;">${escapeHtml(label)}</a>`;
}

function codeBox(rowsHtml) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;border:1px solid ${LINE};border-radius:8px;">
      ${rowsHtml}
    </table>`;
}

function codeText(code) {
  return `<span style="font:bold 16px/24px 'SFMono-Regular', Consolas, 'Courier New', monospace;letter-spacing:2px;color:${NAVY};">${escapeHtml(code)}</span>`;
}

function spacer() {
  return `<div style="height:16px;"></div>`;
}

function signOff() {
  return paragraph("Kind regards,<br>The Loxygen Academy team");
}

function layout({ preheader, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
          <tr>
            <td style="background:${NAVY};border-radius:12px 12px 0 0;padding:24px 40px;">
              <a href="${escapeHtml(SITE_URL)}" style="font:bold 18px/24px ${FONT};letter-spacing:2px;color:#ffffff;text-decoration:none;">LOXYGEN</a>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 12px 12px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 40px;font:12px/18px ${FONT};color:${MUTED};">
              Loxygen Academy · ${link(SITE_URL, SITE_HOST)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Micro-learnings team plan purchase (card or bank transfer) ───────────────

// renews: true for a Stripe subscription (expiryDate is its next renewal),
// false for a manually granted licence (it simply ends on expiryDate).
export function buildLicenseConfirmationEmail({
  firstName,
  companyName,
  seats,
  grantDate,
  expiryDate,
  renews,
}) {
  const seatCount = seats.length;
  const seatLabel = `${seatCount} seat${seatCount === 1 ? "" : "s"}`;
  const teamUrl = `${SITE_URL}/account/team`;

  const unclaimed = seats.filter((seat) => seat.status === "unclaimed");
  const codeRows = unclaimed
    .map(
      (seat, index) => `
        <tr>
          <td style="padding:12px 16px;${index < unclaimed.length - 1 ? `border-bottom:1px solid ${LINE};` : ""}">
            ${codeText(seat.redemption_code)}
            ${seat.invited_email ? `<span style="font:13px/20px ${FONT};color:${MUTED};"> · ${escapeHtml(seat.invited_email)}</span>` : ""}
          </td>
        </tr>`
    )
    .join("");

  const validity = renews
    ? `Your licence runs for one year from ${escapeHtml(formatEmailDate(grantDate))} and renews automatically on ${escapeHtml(formatEmailDate(expiryDate))}.`
    : `Your licence is valid for one year, from ${escapeHtml(formatEmailDate(grantDate))} until ${escapeHtml(formatEmailDate(expiryDate))}.`;

  const body = `
    ${paragraph(`Dear ${escapeHtml(firstName || "customer")},`)}
    ${paragraph(
      `Thank you for subscribing to Loxygen Academy Micro Learnings. Your licence for ${seatLabel} is now active for ${escapeHtml(companyName || "your team")}.`
    )}
    ${heading("Your access codes")}
    ${codeBox(codeRows)}
    ${heading("Your next steps as team administrator")}
    ${steps([
      `${strong("Go to your team page:")} sign in at ${escapeHtml(SITE_HOST)} and open ${link(teamUrl, `${SITE_HOST}/account/team`)}.`,
      `${strong("Assign a seat to each colleague:")} enter the email address of each colleague who should get access. You can also assign a seat to yourself.`,
      `${strong("Your colleagues receive an email:")} colleagues without an account get an invitation to set one up, redeem their code and start learning. Colleagues who already have an account get access straight away.`,
    ])}
    ${button(teamUrl, "Go to my team page")}
    ${paragraph(
      "You can come back to your team page at any time to see which seats are assigned and which are still free."
    )}
    ${heading("Good to know")}
    ${bullets([
      validity,
      "Unused licences are non-refundable.",
      "Access is personal. Every user signs in with their own account, so forwarding a link to someone without a seat will not give them access.",
      `Questions? Contact Geert De Wilde at ${link(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}.`,
    ])}
    ${spacer()}
    ${signOff()}`;

  return {
    subject: `Your Loxygen Academy Micro Learnings licence: ${seatLabel} ${seatCount === 1 ? "is" : "are"} ready`,
    html: layout({ preheader: `Your access codes and next steps for ${seatLabel}.`, body }),
  };
}

// ── Invitation to a colleague without an account ─────────────────────────────

export function buildSeatInviteEmail({
  inviterName,
  companyName,
  code,
  redeemUrl,
  recipientEmail,
  expiryDate,
  renews,
}) {
  const inviter = escapeHtml(inviterName || "Your colleague");
  const from = companyName ? ` from ${escapeHtml(companyName)}` : "";

  const validity = renews
    ? `Your access renews with your team's licence (next renewal: ${escapeHtml(formatEmailDate(expiryDate))}).`
    : `Your access is valid until ${escapeHtml(formatEmailDate(expiryDate))}.`;

  const body = `
    ${paragraph("Hello,")}
    ${paragraph(
      `${inviter}${from} has given you a seat for Loxygen Academy Micro Learnings: short, practical modules on freight forwarding and logistics that you can follow at your own pace.`
    )}
    ${heading("Get started in 3 steps")}
    ${steps([
      `${strong("Set up your account:")} click the button below. Your email address and access code are already filled in — just choose a password.`,
      `${strong("Click Redeem:")} your account is created and your seat is activated.`,
      `${strong("Start learning:")} you land in the Micro Learnings library — open any module to begin.`,
    ])}
    ${button(redeemUrl, "Set up my account")}
    ${codeBox(`
      <tr>
        <td style="padding:16px;">
          <div style="font:13px/20px ${FONT};color:${MUTED};">Your access code</div>
          <div style="margin-top:4px;">${codeText(code)}</div>
          <div style="margin-top:8px;font:13px/20px ${FONT};color:${MUTED};">Keep it for your records. You only need it if the code isn't filled in automatically.</div>
        </td>
      </tr>`)}
    ${heading("Good to know")}
    ${bullets([
      validity,
      `Access is personal. Always sign in with the email address this invitation was sent to: ${strong(escapeHtml(recipientEmail))}.`,
      `Next time, just go to ${link(SITE_URL, SITE_HOST)} and click Sign in.`,
      `Questions? Contact ${inviter} or Loxygen Academy at ${link(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}.`,
    ])}
    ${spacer()}
    ${signOff()}`;

  return {
    subject: `${inviterName || "A colleague"} has given you access to Loxygen Academy Micro Learnings`,
    html: layout({ preheader: "Set up your account and start learning in 3 steps.", body }),
  };
}

// ── Access granted straight away (existing account, or a 1-seat purchase) ───

// Two senders, two wordings, one layout: a colleague added to a team who
// already had an account, and a buyer whose single seat was assigned to
// themselves at checkout.
export function buildSeatAutoClaimedEmail({
  inviterName,
  companyName,
  expiryDate,
  renews,
  selfPurchase = false,
}) {
  const libraryUrl = `${SITE_URL}/micro-learnings/library`;
  const inviter = escapeHtml(inviterName || "Your colleague");
  const from = companyName ? ` from ${escapeHtml(companyName)}` : "";

  const intro = selfPurchase
    ? "Thank you for subscribing to Loxygen Academy Micro Learnings. Your seat is active and linked to your account — you can start right away."
    : `${inviter}${from} has given you a seat for Loxygen Academy Micro Learnings. It's already linked to your existing account — no code needed.`;

  const validity = renews
    ? `Your access renews ${selfPurchase ? "automatically" : "with your team's licence"} (next renewal: ${escapeHtml(formatEmailDate(expiryDate))}).`
    : `Your access is valid until ${escapeHtml(formatEmailDate(expiryDate))}.`;

  const body = `
    ${paragraph("Hello,")}
    ${paragraph(intro)}
    ${paragraph(`Sign in at ${escapeHtml(SITE_HOST)} and open the Micro Learnings library to start any module.`)}
    ${button(libraryUrl, "Open the library")}
    ${heading("Good to know")}
    ${bullets([
      validity,
      `Questions? Contact ${selfPurchase ? "" : `${inviter} or `}Loxygen Academy at ${link(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}.`,
    ])}
    ${spacer()}
    ${signOff()}`;

  return {
    subject: selfPurchase
      ? "Your Loxygen Academy Micro Learnings access is ready"
      : `${inviterName || "A colleague"} has given you access to Loxygen Academy Micro Learnings`,
    html: layout({ preheader: "Your Micro Learnings access is active.", body }),
  };
}

// ── One-off course purchase ──────────────────────────────────────────────────

export function buildCoursePurchaseConfirmationEmail({ courseTitle, courseSlug }) {
  const courseUrl = `${SITE_URL}/courses/${courseSlug}`;
  const body = `
    ${paragraph(`Thanks for your purchase! You now have access to ${strong(escapeHtml(courseTitle))}.`)}
    ${button(courseUrl, "Start learning")}
    ${paragraph("You can come back to it any time from your account.")}
    ${signOff()}`;

  return {
    subject: `Your purchase is confirmed: ${courseTitle}`,
    html: layout({ preheader: `You now have access to ${courseTitle}.`, body }),
  };
}

// ── Password reset ───────────────────────────────────────────────────────────

export function buildPasswordResetEmail({ resetUrl }) {
  const body = `
    ${paragraph("Someone requested a password reset for this Loxygen Academy account.")}
    ${button(resetUrl, "Set a new password")}
    ${paragraph("This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't change.")}
    ${signOff()}`;

  return {
    subject: "Reset your Loxygen Academy password",
    html: layout({ preheader: "Set a new password for your Loxygen Academy account.", body }),
  };
}

// ── Admin notifications (plain) ──────────────────────────────────────────────

export function buildPurchaseNotificationEmail({ courseTitle, tierLabel, buyerName, buyerEmail }) {
  return {
    subject: `New booking: ${courseTitle}${tierLabel ? ` (${tierLabel})` : ""}`,
    html: `
      <p>Someone just booked <strong>${escapeHtml(courseTitle)}</strong>${
        tierLabel ? ` — <strong>${escapeHtml(tierLabel)}</strong>` : ""
      }.</p>
      <p><strong>Name:</strong> ${escapeHtml(buyerName || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(buyerEmail)}</p>
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
