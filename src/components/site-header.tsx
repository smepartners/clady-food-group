"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X, CaretDown } from "@phosphor-icons/react";

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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-cream-200 bg-cream-100">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Clady Group home">
          <Image
            src="/clady-logo.png"
            alt="Clady Group"
            width={1399}
            height={749}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-x-7 text-sm font-medium text-ink-soft lg:flex">
          <div className="group relative">
            <Link
              href="/brands"
              className="relative flex items-center gap-1 py-1 transition hover:text-green-700 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Our Brands
              <CaretDown size={12} weight="bold" className="transition duration-200 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-cream-200 bg-cream-100 py-2 shadow-xl shadow-green-900/10">
                {BRANDS.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/brands/${b.slug}`}
                    className="block px-4 py-2.5 text-sm text-ink-soft transition hover:bg-cream-200/60 hover:text-green-700"
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
              className="relative py-1 transition hover:text-green-700 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-green-700 px-5 py-2 text-cream-100 transition hover:bg-green-900"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-green-700 lg:hidden"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-cream-200 bg-cream-100 px-4 py-4 text-sm font-medium text-ink-soft lg:hidden">
          <Link
            href="/brands"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2.5 transition hover:bg-cream-200 hover:text-green-700"
          >
            Our Brands
          </Link>
          <div className="ml-2 flex flex-col gap-0.5 border-l border-cream-200 pl-3">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-ink-soft/80 transition hover:bg-cream-200 hover:text-green-700"
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
              className="rounded-md px-2 py-2.5 transition hover:bg-cream-200 hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-cream-100 transition hover:bg-green-900"
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
