import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/lib/brands";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-cream-200 bg-cream-200/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <Image
            src="/clady-logo-landscape.png"
            alt="Clady Group"
            width={1600}
            height={317}
            className="h-10 w-auto opacity-90 sm:h-11"
          />
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-green-700">
                  {item.label}
                </Link>
              ))}
            </nav>
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
          </div>
        </div>
        <div className="mt-10 border-t border-cream-200 pt-6 text-sm text-ink-soft">
          <p>&copy; {new Date().getFullYear()} Clady Group.</p>
          {/* TODO: registered company name, number and address - open question #06 in the build plan */}
          <p className="mt-1 text-xs italic">
            [PENDING] Registered company details go here once confirmed.
          </p>
        </div>
      </div>
    </footer>
  );
}
