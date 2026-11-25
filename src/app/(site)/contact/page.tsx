import type { Metadata } from "next";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";
import { sanityFetch } from "@/sanity/lib/client";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";
import { getContactDetails } from "@/lib/site-settings-data";
import { getBrand } from "@/lib/brands-data";

export const metadata: Metadata = { title: "Contact" };

type ContactPageDoc = { hero?: { subtext?: string }; emailPrompt?: string };

async function getContactPageContent() {
  const fallback = {
    subtext:
      "Whether you're exploring a private label opportunity or want to know more about one of our brands, we'd like to hear from you.",
    emailPrompt: "Prefer email? Reach us directly at",
  };
  try {
    const doc = await sanityFetch<ContactPageDoc | null>(CONTACT_PAGE_QUERY);
    if (doc) {
      return {
        subtext: doc.hero?.subtext ?? fallback.subtext,
        emailPrompt: doc.emailPrompt ?? fallback.emailPrompt,
      };
    }
  } catch {
    // fall through
  }
  return fallback;
}

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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand: brandSlug } = await searchParams;
  const [content, contact, brand] = await Promise.all([
    getContactPageContent(),
    getContactDetails(),
    brandSlug ? getBrand(brandSlug) : Promise.resolve(undefined),
  ]);
  // George, Nov 2026 (WhatsApp): arriving via a brand's own "Get in touch"
  // CTA (brands/[slug]/page.tsx passes ?brand=<slug>) should show that
  // brand's own contact details, not the group-wide Site settings ones -
  // e.g. Dutch Maid has its own inbox/number rather than the Clady one.
  // Falls back to the group default whenever the brand has no override set.
  const email = brand?.contactEmail || contact.email;
  const phone = brand?.contactPhone || contact.phone;
  return (
    <>
      <ContactHero subheading={content.subtext} />

      {/* Rebuilt Nov 2026 (Zoe): "make the form 3/4 width and centralise"
          plus "create 2 blocks under the form - Call us with a phone icon
          and the number, and Email us with envelope icon and the email
          address, maybe the paler green for the blocks" - replaces the
          previous side-by-side layout (email/phone column next to the
          form) with the form centred at 3/4 width on larger screens, and
          the call/email details moved into their own pair of cards below
          it rather than a plain paragraph + link. "Paler green" isn't a
          colour in the site's palette (just green-900/700/500), so these
          use the same low-opacity green wash already used for icon badges
          elsewhere on the site (e.g. IconFeature's bg-green-700/10). */}
      <Section>
        <div className="mx-auto w-full lg:w-3/4">
          <Reveal>
            <ContactForm />
          </Reveal>

          {(email || phone) ? (
            <RevealStagger className="mt-6 grid gap-4 sm:grid-cols-2">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-4 rounded-xl bg-green-700/10 p-5 transition hover:bg-green-700/15"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-700/15 text-green-700">
                    <Phone size={20} weight="bold" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-green-700">
                      Call us
                    </span>
                    <span className="block font-medium text-ink">{phone}</span>
                  </span>
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 rounded-xl bg-green-700/10 p-5 transition hover:bg-green-700/15"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-700/15 text-green-700">
                    <EnvelopeSimple size={20} weight="bold" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-green-700">
                      Email us
                    </span>
                    <span className="block font-medium text-ink">{email}</span>
                  </span>
                </a>
              ) : null}
            </RevealStagger>
          ) : null}
        </div>
      </Section>
    </>
  );
}
