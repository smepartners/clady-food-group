import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Our Brands" },
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
            src="/clady-logo.png"
            alt="Clady Group"
            width={1399}
            height={749}
            className="h-10 w-auto opacity-90"
          />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-green-700">
                {item.label}
              </Link>
            ))}
          </nav>
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
