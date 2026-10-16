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
    <footer className="relative overflow-hidden border-t border-cream-200 bg-cream-200/40">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <Image
            src="/clady-logo-landscape.png"
            alt="Clady Food Group"
            width={1600}
            height={317}
            className="h-10 w-auto opacity-90 sm:h-11"
          />
          {/* Round 5 feedback: brands list leads, ahead of the page-link
              column, mirroring how prominently the header dropdown and the
              /brands index page itself treat the brand portfolio. */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav>
              <Link
                href="/brands"
                className="text-xs font-semibold uppercase tracking-wide text-olive-600 transition hover:text-green-700"
              >
                Our Brands
              </Link>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft sm:flex-col sm:gap-y-1.5">
                {BRANDS.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}`} className="transition hover:text-green-700">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-green-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-200 pt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-olive-600">
            Where we manufacture
          </p>
          <FacilityStrip tone="light" className="mt-4" />
        </div>

        {/* Round 5 feedback: contact details added. Round 6: CFG's LinkedIn
            page is live, so the icon is now a real link rather than the
            placeholder it was.
            Round 7 feedback: "can the LinkedIn icon be beside the phone
            number and a little bigger" - moved out of its own
            justify-between slot and into the same contact-details group
            as email/phone, directly after the phone link, and sized up
            (20 -> 24). */}
        <div className="mt-10 border-t border-cream-200 pt-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink-soft">
            <a href="mailto:sales@cladyfoodgroup.com" className="flex items-center gap-2 transition hover:text-green-700">
              <EnvelopeSimple size={16} weight="bold" className="text-olive-600" />
              sales@cladyfoodgroup.com
            </a>
            <a href="tel:+442894429555" className="flex items-center gap-2 transition hover:text-green-700">
              <Phone size={16} weight="bold" className="text-olive-600" />
              028 9442 9555
            </a>
            <a
              href="https://www.linkedin.com/company/clady-food-group"
              target="_blank"
              rel="noreferrer"
              aria-label="Clady Food Group on LinkedIn"
              className="flex items-center text-ink-soft transition hover:text-green-700"
            >
              <LinkedinLogo size={24} weight="fill" />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-cream-200 pt-6 text-sm text-ink-soft">
          <p>&copy; {new Date().getFullYear()} Clady Food Group.</p>
          {/* TODO: registered company name, number and address - open question #06 in the build plan */}
        </div>
      </div>
    </footer>
  );
}
