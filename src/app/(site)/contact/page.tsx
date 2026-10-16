import type { Metadata } from "next";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

// Field set and destination confirmed with the client (Zoe, SME Partners):
// name, company, phone, email, message, all routing to one inbox with no
// per-market split. Previously posted as a mailto: link, which only worked
// if the visitor's own device had an email client configured - per George's
// instruction (Oct 2026) this now posts to /api/contact (ContactForm,
// contact-form.tsx), which sends via Resend to sales@cladyfoodgroup.com,
// cc'd to hello@thesmepartners.co.uk. See the setup notes at the top of
// src/app/api/contact/route.ts for what still needs a real Resend account/
// API key/verified sending domain before this is live.
//
// Round 5 feedback (Zoe, via George):
// - "Update hello@ to sales@" - done below (sales@cladyfoodgroup.com, to
//   match the footer's address rather than the old .co.uk hello@ one).
// - "Is the brands list distracting here?" - read as Zoe leaning toward
//   yes (she's the one who flagged it), so the BrandGrid that used to sit
//   under the email line has been removed; the page now reads as a clean
//   get-in-touch moment rather than repeating the brand portfolio a third
//   time on the site. Easy to reinstate if she'd rather keep it.
// - "Should we have head office address and phone number here?" / Round 7
//   feedback: "Contact number / head office address not added" - the
//   phone number is now added below (028 9442 9555, the same confirmed
//   number already live in the footer). No real head office street
//   address has been supplied by Zoe anywhere in the brand pack or
//   client context - checked again this round rather than guessing a
//   placeholder - so that part stays out until she confirms one; see the
//   matching TODO in site-footer.tsx (open question #06 in the build
//   plan).
//
// This page used to be a single boxed hero holding the headline, form and
// brand grid all at once - now the hero (see contact-hero.tsx) is a plain
// full-bleed statement matching the rest of the site, and the form/details
// live in this section below instead. This section sits on the page's
// normal light background in both preview styles (unlike the hero, it was
// never on dark green), so unlike the old hero-embedded form it doesn't
// need Simple/Bold-aware styling at all.

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
            {/* Round 7 feedback: "contact number / head office address
                not added" - phone number added (same confirmed number as
                the footer). No head office street address has been
                supplied yet - see the comment block above this
                component. */}
            <a
              href="tel:+442894429555"
              className="mt-3 flex w-fit items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
            >
              <Phone size={16} weight="bold" />
              028 9442 9555
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
