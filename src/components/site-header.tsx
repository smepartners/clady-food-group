import Link from "next/link";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Our Brands" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-cream-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-green-700">
          Clady Group
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
