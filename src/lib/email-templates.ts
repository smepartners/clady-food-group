import { SITE_URL } from "@/lib/site";

/**
 * Shared branding for every Resend email the site sends (currently just the
 * contact-form notification in src/app/api/contact/route.ts, but any future
 * one should import from here rather than hand-rolling its own markup).
 *
 * Email HTML can't read the site's Tailwind tokens (globals.css's @theme
 * block), so the palette is hardcoded here as plain hex, matching those
 * tokens exactly:
 *   green-900 #1c2e21 / green-700 #32533a / gold-500 #f4bf44
 *   cream-100 #f5f4e5 / cream-200 #ece9d4 / ink #232a20 / ink-soft #55604f
 *
 * Built as a classic table-based layout (not flexbox/grid) with every style
 * inlined, since that's what actually renders consistently across Outlook/
 * Gmail/Apple Mail rather than just in a browser preview. The logo is
 * referenced by its absolute cladyfoodgroup.com URL (SITE_URL) - email
 * clients can't resolve a relative/local path the way a browser can.
 */

const COLORS = {
  green900: "#1c2e21",
  green700: "#32533a",
  gold500: "#f4bf44",
  cream100: "#f5f4e5",
  cream200: "#ece9d4",
  ink: "#232a20",
  inkSoft: "#55604f",
} as const;

const FONT_STACK =
  "'Helvetica Neue', Helvetica, Arial, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Wraps body content in the shared header/footer chrome: dark green header
 * band with the white logo lockup, cream card body, gold accent rule, light
 * footer with a link back to the live site. `preheader` is the hidden
 * inbox-preview snippet (Gmail/Apple Mail show it next to the subject). */
function emailShell({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Clady Food Group</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${COLORS.cream200}; font-family: ${FONT_STACK};">
    <!-- Preheader: hidden, shows as the inbox preview snippet -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
      ${escapeHtml(preheader)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${COLORS.cream200};">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 100%; background-color: #ffffff;">
            <!-- Header -->
            <tr>
              <td style="background-color: ${COLORS.green900}; padding: 28px 32px;">
                <img
                  src="${SITE_URL}/clady-logo-landscape-white.png"
                  alt="Clady Food Group"
                  width="180"
                  style="display: block; width: 180px; height: auto; border: 0;"
                />
              </td>
            </tr>
            <!-- Gold accent rule -->
            <tr>
              <td style="background-color: ${COLORS.gold500}; height: 4px; line-height: 4px; font-size: 0;">&nbsp;</td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color: ${COLORS.cream100}; padding: 20px 32px; border-top: 1px solid ${COLORS.cream200};">
                <p style="margin: 0; font-family: ${FONT_STACK}; font-size: 12px; line-height: 1.6; color: ${COLORS.inkSoft};">
                  Clady Food Group &middot;
                  <a href="${SITE_URL}" style="color: ${COLORS.green700}; text-decoration: none;">${SITE_URL.replace("https://", "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type ContactEnquiryFields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
};

/** The contact-form notification email (sent to sales@cladyfoodgroup.com,
 * cc'd to hello@thesmepartners.co.uk - see route.ts). Returns both the html
 * and a plain-text fallback, since Resend (like any mail API) expects both
 * - the text version is what renders in a client that strips HTML or in a
 * screen reader's plain-text view. */
export function contactEnquiryEmail(fields: ContactEnquiryFields) {
  const { name, company, phone, email, message } = fields;

  const fieldRows: [string, string][] = [
    ["Name", name],
    ["Company", company || "-"],
    ["Phone", phone || "-"],
    ["Email", email],
  ];

  const fieldsHtml = fieldRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 6px 16px 6px 0; font-family: ${FONT_STACK}; font-size: 14px; color: ${COLORS.inkSoft}; vertical-align: top; white-space: nowrap;">${label}</td>
          <td style="padding: 6px 0; font-family: ${FONT_STACK}; font-size: 14px; color: ${COLORS.ink}; font-weight: 600;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const bodyHtml = `
    <h1 style="margin: 0 0 4px; font-family: ${FONT_STACK}; font-size: 20px; font-weight: 700; color: ${COLORS.green700};">
      New website enquiry
    </h1>
    <p style="margin: 0 0 24px; font-family: ${FONT_STACK}; font-size: 14px; color: ${COLORS.inkSoft};">
      Submitted via the contact form at cladyfoodgroup.com
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      ${fieldsHtml}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${COLORS.cream200};">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="margin: 0 0 8px; font-family: ${FONT_STACK}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${COLORS.inkSoft};">
            Message
          </p>
          <p style="margin: 0; font-family: ${FONT_STACK}; font-size: 14px; line-height: 1.6; color: ${COLORS.ink}; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </td>
      </tr>
    </table>
  `;

  const html = emailShell({
    preheader: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
    bodyHtml,
  });

  const text = [
    "New website enquiry - submitted via the contact form at cladyfoodgroup.com",
    "",
    ...fieldRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  return { html, text };
}
