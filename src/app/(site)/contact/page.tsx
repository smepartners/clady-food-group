import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ContactHero } from "@/components/contact-hero";

export const metadata: Metadata = { title: "Contact" };

// Field set and destination confirmed with the client (Zoe, SME Partners):
// name, company, phone, email, message, all routing to one inbox with no
// per-market split. The form posts as a mailto: for now - swap the <form>
// action for a proper handler (API route + email provider) once a real
// inbox-backed endpoint is set up, before launch.
//
// Round 5 feedback (Zoe, via George):
// - "Update hello@ to sales@" - done below (sales@cladyfoodgroup.com, to
//   match the footer's address rather than the old .co.uk hello@ one).
// - "Is the brands list distracting here?" - read as Zoe leaning toward
//   yes (she's the one who flagged it), so the BrandGrid that used to sit
//   under the email line has been removed; the page now reads as a clean
//   get-in-touch moment rather than repeating the brand portfolio a third
//   time on the site. Easy to reinstate if she'd rather keep it.
// - "Should we have head office address and phone number here?" - NOT
//   implemented. No real head office address or phone number has been
//   supplied yet (the footer's "028 9442 9555" is the general contact
//   number from this same feedback doc, not confirmed as the head office
//   line) - needs a real answer from Zoe before this goes in, rather than
//   guessing a placeholder address.
//
// This page used to be a single boxed hero holding the headline, form and
// brand grid all at once - now the hero (see contact-hero.tsx) is a plain
// full-bleed statement matching the rest of the site, and the form/details
// live in this section below instead. This section sits on the page's
// normal light background in both preview styles (unlike the hero, it was
// never on dark green), so unlike the old hero-embedded form it doesn't
// need Simple/Bold-aware styling at all.

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="max-w-md text-sm text-ink-soft">
              Prefer email? Reach us directly at{" "}
              <a
                href="mailto:sales@cladyfoodgroup.com"
                className="font-medium text-green-700 underline underline-offset-2 hover:text-green-900"
              >
                sales@cladyfoodgroup.com
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              action="mailto:sales@cladyfoodgroup.com"
              method="post"
              encType="text/plain"
              className="space-y-5 rounded-2xl border border-cream-200 bg-cream-100 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="text-sm font-medium text-ink">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      required={f.name === "name" || f.name === "email"}
                      className="mt-1.5 w-full rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1.5 w-full resize-none rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-fit items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-cream-100 shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30 active:translate-y-0 active:scale-[0.98]"
              >
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
