"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Our Brands" },
  { href: "/private-label", label: "Private Label" },
  { href: "/csr", label: "CSR" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-cream-200 bg-cream-100">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Clady Group home">
          <Image
            src="/clady-logo.png"
            alt="Clady Group"
            width={1399}
            height={749}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-x-7 text-sm font-medium text-ink-soft lg:flex">
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
