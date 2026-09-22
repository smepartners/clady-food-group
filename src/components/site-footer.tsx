"use client";

import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/lib/brands";
import { FacilityStrip, TextureOverlay } from "@/components/ui";
import { useSiteStyle } from "@/components/site-theme";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Contact" },
];

/**
 * The footer is the one element every page shares, so it's the highest-
 * leverage single place to apply the "Bold" preview style (see
 * site-theme.tsx) - both reference sites (HW Group, Queensland Bakery Co.)
 * lean on a substantial, dark, multi-column footer rather than the thin
 * light strip this site had. Bold swaps in the real white logo mark
 * (supplied by Zoe, not a CSS filter on the dark-ink version), the gold
 * leather texture treatment already used elsewhere, and surfaces the
 * manufacturing locations again - the same real scale signal used in the
 * hero bands, now closing every page out too.
 */
export function SiteFooter() {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <footer
      className={`relative mt-24 overflow-hidden border-t ${
        bold ? "border-transparent bg-green-900" : "border-cream-200 bg-cream-200/40"
      }`}
    >
      {bold ? (
        <TextureOverlay
          texture="/texture-leather-gold.jpg"
          watermark="/logo-icon-watermark-gold.png"
          blend="mix-blend-soft-light"
          opacity="opacity-40"
        />
      ) : null}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <Image
            src={bold ? "/clady-logo-landscape-white.png" : "/clady-logo-landscape.png"}
            alt="Clady Group"
            width={1600}
            height={317}
            className="h-10 w-auto opacity-90 sm:h-11"
          />
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className={`flex flex-wrap gap-x-8 gap-y-2 text-sm ${bold ? "text-cream-100/80" : "text-ink-soft"}`}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${bold ? "hover:text-gold-500" : "hover:text-green-700"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav>
              <Link
                href="/brands"
                className={`text-xs font-semibold uppercase tracking-wide transition ${
                  bold ? "text-gold-500 hover:text-cream-100" : "text-olive-600 hover:text-green-700"
                }`}
              >
                Our Brands
              </Link>
              <ul
                className={`mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm sm:flex-col sm:gap-y-1.5 ${
                  bold ? "text-cream-100/80" : "text-ink-soft"
                }`}
              >
                {BRANDS.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/brands/${b.slug}`}
                      className={`transition ${bold ? "hover:text-gold-500" : "hover:text-green-700"}`}
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={`mt-10 border-t pt-8 ${bold ? "border-cream-100/15" : "border-cream-200"}`}>
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              bold ? "text-cream-100/50" : "text-olive-600"
            }`}
          >
            Where we manufacture
          </p>
          <FacilityStrip tone={bold ? "dark" : "light"} className="mt-4" />
        </div>

        <div
          className={`mt-10 border-t pt-6 text-sm ${
            bold ? "border-cream-100/15 text-cream-100/60" : "border-cream-200 text-ink-soft"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} Clady Group.</p>
          {/* TODO: registered company name, number and address - open question #06 in the build plan */}
        </div>
      </div>
    </footer>
  );
}
