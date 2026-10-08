"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/**
 * On the homepage, the header starts transparent and overlaid on the hero
 * (so the hero video/grid runs full-bleed right up under the nav to the
 * very top of the page, per client feedback - the solid cream bar was
 * "letting those [sections] beneath it down"), then solidifies to the
 * usual cream bar once the page scrolls past the hero. Every other page
 * keeps the plain always-solid header, in normal document flow, since
 * their heroes aren't full-bleed and a transparent-then-solid header would
 * just flash over ordinary content.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overlay = pathname === "/";

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled || open;

  return (
    <header
      className={`${overlay ? "absolute inset-x-0 top-0 z-40" : "relative"} transition-colors duration-300 ${
        solid ? "border-b border-cream-200 bg-cream-100" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Clady Group home">
          <Image
            src={solid ? "/clady-logo-landscape.png" : "/clady-logo-landscape-white.png"}
            alt="Clady Group"
            width={1600}
            height={317}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav
          className={`hidden items-center gap-x-7 text-sm font-medium lg:flex ${
            solid ? "text-ink-soft" : "text-cream-100/90"
          }`}
        >
          <div className="group relative">
            <Link
              href="/brands"
              className={`relative flex items-center gap-1 py-1 transition after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                solid ? "hover:text-green-700" : "hover:text-cream-100"
              }`}
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
              className={`relative py-1 transition after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                solid ? "hover:text-green-700" : "hover:text-cream-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-full px-5 py-2 transition ${
              solid
                ? "bg-green-700 text-cream-100 hover:bg-green-900"
                : "bg-cream-100 text-green-700 hover:bg-cream-200"
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
            solid ? "text-green-700" : "text-cream-100"
          }`}
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
