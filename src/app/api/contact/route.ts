import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEnquiryEmail } from "@/lib/email-templates";
import { client } from "@/sanity/lib/client";

/**
 * Handles the Contact page form (src/components/contact-form.tsx). Replaces
 * the old `action="mailto:..."` form, which depended on the visitor's own
 * email client being configured - the existing comment on the contact page
 * flagged this as a stopgap "swap for a proper handler ... before launch".
 *
 * Sends via Resend (https://resend.com) to sales@cladyfoodgroup.com, cc'd to
 * hello@thesmepartners.co.uk, per George's instruction (Oct 2026).
 *
 * REQUIRED BEFORE THIS GOES LIVE - none of this can be set up from the
 * build environment, it needs real account/DNS access:
 * 1. A Resend account for Clady Group (or Discoverable, if sending on
 *    their behalf) with an API key, set as RESEND_API_KEY in the
 *    deployment's environment variables (Vercel project settings, or
 *    .env.local for local testing - see .env.example).
 * 2. cladyfoodgroup.com added and DNS-verified as a sending domain in
 *    Resend (SPF/DKIM records) - required for `from` to be an
 *    @cladyfoodgroup.com address and to avoid the mail landing in spam.
 *    Until that's done, Resend's shared onboarding domain
 *    (onboarding@resend.dev) can be used as CONTACT_FROM_EMAIL for
 *    testing only - it works without verification but shouldn't be the
 *    production sender.
 * 3. CONTACT_FROM_EMAIL set once the domain is verified, e.g.
 *    enquiries@cladyfoodgroup.com (see .env.example).
 * Without RESEND_API_KEY set, this route returns a 500 and the form on
 * the page falls back to showing the direct mailto/phone details rather
 * than failing silently.
 */

const TO_EMAIL = "sales@cladyfoodgroup.com";
const CC_EMAIL = "hello@thesmepartners.co.uk";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Set only when the enquiry came from a brand page's contact modal
  // (brand-contact-modal.tsx via contact-form.tsx's `brand` prop) - blank
  // for the main Contact page's own form.
  const brand = typeof body.brand === "string" ? body.brand.trim() : "";

  // Matches the required fields already enforced client-side in
  // contact-form.tsx (name, email, message) - re-checked here since a
  // client-side `required` attribute can always be bypassed.
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set - see the setup notes at the top of src/app/api/contact/route.ts"
    );
    return NextResponse.json(
      { error: "Email sending is not configured yet." },
      { status: 500 }
    );
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const resend = new Resend(apiKey);

  const { html, text } = contactEnquiryEmail({ name, company, phone, email, message, brand });

  try {
    const { error } = await resend.emails.send({
      from: `Clady Food Group website <${fromEmail}>`,
      to: [TO_EMAIL],
      cc: [CC_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}${brand ? ` - ${brand}` : ""}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error sending contact form email:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Unexpected error sending contact form email:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  // Nov 2026 (George: "make sure we store which brand is being enquired
  // about"): the email above is the primary notification, but it isn't
  // something anyone can search or filter later - this also writes the
  // same submission as an `enquiry` document (schemaTypes/enquiry.ts), so
  // it shows up in the Studio with the brand it came from. Best-effort:
  // a failure here never fails the request back to the visitor, since
  // the email already went out - it's logged and swallowed.
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;
  if (writeToken) {
    try {
      await client.withConfig({ token: writeToken }).create({
        _type: "enquiry",
        name,
        company: company || undefined,
        email,
        phone: phone || undefined,
        message,
        brand: brand || undefined,
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to store enquiry document in Sanity:", err);
    }
  } else {
    console.error(
      "SANITY_API_WRITE_TOKEN is not set - enquiry was emailed but not stored in Sanity."
    );
  }

  return NextResponse.json({ ok: true });
}
