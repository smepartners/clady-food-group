import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, Phone, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { BRANDS } from "@/lib/brands";
import { FacilityStrip } from "@/components/ui";

// Round 5 feedback: Private Label moved up next to About Us/CSR (matching
// the header nav reorder), and the label changed from "Contact" to "Get in
// touch" to match the header CTA's wording.
const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Get in touch" },
];

export function SiteFooter() {
  return (
    // Round 7 feedback (CSR page): "white section above footer to be
    // removed" - this `mt-24` top margin let the page's own plain
    // background show through as a flat, unstyled gap between the last
    // page section and the footer's own bordered/tinted background,
    // most visible on a page (like CSR) whose last section is a dark
    // full-bleed band. Dropped so the footer sits flush against
    // whatever the page ends on - the footer's own `border-t` already
    // provides the visual separation.
    //
    // Redesigned (Oct 2026, George): "feels like it could be redesigned/
    // styled as lots of empty space" - the old layout was a single flex
    // row (`justify-between`) with just the logo on the left and the
    // brands/pages columns pushed to the right, leaving a dead gap down
    // the middle on anything wider than a tablet, then three more
    // full-width strips stacked below it (manufacturing sites, contact
    // details, copyright), each getting its own border-t/pt-8 - a lot of
    // vertical rhythm for not much content per row. Replaced with one
    // proper 4-column grid (logo+blurb+sites / brands / pages / contact)
    // so the width is used evenly and everything that used to be a
    // separate full-width strip is now just another column, with a
    // single thin divider above the copyright line at the bottom.
    <footer className="relative overflow-hidden border-t border-cream-200 bg-cream-200/40">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <div>
            <Image
              src="/clady-logo-landscape.png"
              alt="Clady Food Group"
              width={1600}
              height={317}
              className="h-10 w-auto opacity-90 sm:h-11"
            />
            {/* Reuses the group description already established on the
                homepage hero (home-hero-video.tsx) rather than new copy,
                so the logo column isn't just a mark sitting in empty
                space. */}
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              A group of specialist food, confectionery and beverage brands,
              manufacturing across the UK and Ireland.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-olive-600">
              Where we manufacture
            </p>
            <FacilityStrip tone="light" layout="col" className="mt-3 text-sm" />
          </div>

          {/* Round 5 feedback: brands list leads, ahead of the page-link
              column, mirroring how prominently the header dropdown and the
              /brands index page itself treat the brand portfolio. */}
          <nav>
            <Link
              href="/brands"
              className="text-xs font-semibold uppercase tracking-wide text-olive-600 transition hover:text-green-700"
            >
              Our Brands
            </Link>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="transition hover:text-green-700">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="text-xs font-semibold uppercase tracking-wide text-olive-600">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-green-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Round 5 feedback: contact details added. Round 6: CFG's
              LinkedIn page is live, so the icon is now a real link rather
              than the placeholder it was. Round 7 feedback: "can the
              LinkedIn icon be beside the phone number and a little
              bigger" - kept directly under the phone link, sized up
              (20 -> 24). */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-olive-600">Contact</p>
            <div className="mt-3 space-y-2 text-sm text-ink-soft">
              <a href="mailto:sales@cladyfoodgroup.com" className="flex items-center gap-2 transition hover:text-green-700">
                <EnvelopeSimple size={16} weight="bold" className="shrink-0 text-olive-600" />
                sales@cladyfoodgroup.com
              </a>
              <a href="tel:+442894429555" className="flex items-center gap-2 transition hover:text-green-700">
                <Phone size={16} weight="bold" className="shrink-0 text-olive-600" />
                028 9442 9555
              </a>
            </div>
            <a
              href="https://www.linkedin.com/company/clady-food-group"
              target="_blank"
              rel="noreferrer"
              aria-label="Clady Food Group on LinkedIn"
              className="mt-4 flex w-fit items-center text-ink-soft transition hover:text-green-700"
            >
              <LinkedinLogo size={24} weight="fill" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-200 pt-6 text-sm text-ink-soft">
          <p>&copy; {new Date().getFullYear()} Clady Food Group.</p>
          {/* TODO: registered company name, number and address - open question #06 in the build plan */}
        </div>
      </div>
    </footer>
  );
}
