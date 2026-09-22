"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X, CaretDown } from "@phosphor-icons/react";
import { useSiteStyle } from "@/components/site-theme";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
];

const BRANDS = [
  { slug: "evolving-state", name: "Evolving State" },
  { slug: "galway-roast", name: "Galway Roast" },
  { slug: "dutch-maid", name: "Dutch Maid" },
  { slug: "slumberjack", name: "Slumberjack" },
];

/**
 * The header used to stay light in every preview style, on the theory that
 * both reference sites (HW Group, Queensland Bakery Co.) keep a light
 * header even over a dark hero. In practice, sitting a plain cream bar
 * directly on top of the Bold hero's deep green read as a mismatch rather
 * than a deliberate contrast - so the header now switches with the rest of
 * the site (see site-theme.tsx): dark green, white logo mark, gold accents,
 * same as the footer.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <header
      className={`relative border-b transition-colors duration-300 ${
        bold ? "border-cream-100/10 bg-green-900" : "border-cream-200 bg-cream-100"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Clady Group home">
          <Image
            src={bold ? "/clady-logo-landscape-white.png" : "/clady-logo-landscape.png"}
            alt="Clady Group"
            width={1600}
            height={317}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav
          className={`hidden items-center gap-x-7 text-sm font-medium lg:flex ${
            bold ? "text-cream-100/80" : "text-ink-soft"
          }`}
        >
          <div className="group relative">
            <Link
              href="/brands"
              className={`relative flex items-center gap-1 py-1 transition after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                bold ? "hover:text-cream-100" : "hover:text-green-700"
              }`}
            >
              Our Brands
              <CaretDown size={12} weight="bold" className="transition duration-200 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
              <div
                className={`overflow-hidden rounded-xl border py-2 shadow-xl shadow-green-900/10 ${
                  bold ? "border-cream-100/15 bg-green-900" : "border-cream-200 bg-cream-100"
                }`}
              >
                {BRANDS.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/brands/${b.slug}`}
                    className={`block px-4 py-2.5 text-sm transition ${
                      bold
                        ? "text-cream-100/80 hover:bg-cream-100/10 hover:text-gold-500"
                        : "text-ink-soft hover:bg-cream-200/60 hover:text-green-700"
                    }`}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1 transition after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                bold ? "hover:text-cream-100" : "hover:text-green-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-full px-5 py-2 transition ${
              bold
                ? "bg-gold-500 text-green-900 hover:bg-gold-700"
                : "bg-green-700 text-cream-100 hover:bg-green-900"
            }`}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            bold ? "text-cream-100" : "text-green-700"
          }`}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {open ? (
        <nav
          className={`flex flex-col gap-1 border-t px-4 py-4 text-sm font-medium lg:hidden ${
            bold ? "border-cream-100/15 bg-green-900 text-cream-100/80" : "border-cream-200 bg-cream-100 text-ink-soft"
          }`}
        >
          <Link
            href="/brands"
            onClick={() => setOpen(false)}
            className={`rounded-md px-2 py-2.5 transition ${
              bold ? "hover:bg-cream-100/10 hover:text-gold-500" : "hover:bg-cream-200 hover:text-green-700"
            }`}
          >
            Our Brands
          </Link>
          <div className={`ml-2 flex flex-col gap-0.5 border-l pl-3 ${bold ? "border-cream-100/15" : "border-cream-200"}`}>
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2 text-sm transition ${
                  bold
                    ? "text-cream-100/60 hover:bg-cream-100/10 hover:text-gold-500"
                    : "text-ink-soft/80 hover:bg-cream-200 hover:text-green-700"
                }`}
              >
                {b.name}
              </Link>
            ))}
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2.5 transition ${
                bold ? "hover:bg-cream-100/10 hover:text-gold-500" : "hover:bg-cream-200 hover:text-green-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-2 rounded-full px-5 py-2.5 text-center transition ${
              bold
                ? "bg-gold-500 text-green-900 hover:bg-gold-700"
                : "bg-green-700 text-cream-100 hover:bg-green-900"
            }`}
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
