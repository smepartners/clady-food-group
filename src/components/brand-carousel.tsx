"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Package } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { BRANDS } from "@/lib/brands";

// Short one-line straps for each brand - duplicated from the richer copy on
// the /brands index page (see the comment on lib/brands.ts: that page and
// this carousel each carry their own copy rather than overloading the
// shared BRANDS list) so a card reads as more than a logo and a link.
const STRAPS: Record<(typeof BRANDS)[number]["slug"], string> = {
  "evolving-state": "Everyday wellness made easy.",
  "dutch-maid": "Convenience made simple.",
  slumberjack: "Our signature beverage brand.",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/**
 * Bigger, horizontally-scrollable take on the brand grid, built for the
 * homepage's own "Our brands" moment - the pg.co.uk circular-badge
 * treatment (see BrandGrid in ui.tsx), scaled up with scroll-snap and
 * press-the-arrows navigation the way pg.co.uk's own "Our Brands" carousel
 * works, rather than a static grid. BrandGrid stays as-is for the smaller,
 * secondary brand mentions elsewhere (About, Contact, Private Label).
 */
export function BrandCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
            Our brands
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold text-cream-100 sm:text-4xl">
            Specialist brands, <em className="italic text-gold-500">one group.</em>
          </h2>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll brands left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/25 text-cream-100 transition duration-300 hover:border-cream-100 hover:bg-cream-100/10"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll brands right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/25 text-cream-100 transition duration-300 hover:border-cream-100 hover:bg-cream-100/10"
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      <motion.ul
        ref={trackRef}
        className="scrollbar-none mt-10 flex gap-8 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollSnapType: "x mandatory" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {BRANDS.map((b) => (
          <motion.li
            key={b.slug}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
            variants={{
              hidden: reduce ? {} : { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <Link href={`/brands/${b.slug}`} className="group flex w-40 flex-col items-center gap-4 text-center sm:w-48">
              {/* No coloured circle behind the mark - per client feedback,
                  the logo itself is the badge now, given as much room as
                  the card allows rather than being shrunk to fit inside a
                  disc. A plain cream backing keeps every logo legible
                  regardless of its own colours. */}
              <span className="flex h-36 w-36 items-center justify-center bg-cream-100 shadow-lg shadow-green-900/20 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:h-44 sm:w-44">
                <Image
                  src={b.logo}
                  alt=""
                  width={160}
                  height={80}
                  // Round 7 feedback: Dutch Maid's mark reads smaller than
                  // the other three brands here. Its logo is a tall,
                  // nearly-square lockup (icon + wordmark + tagline + date
                  // stacked vertically) rather than the wide, short marks
                  // the other brands supplied, so sizing every logo by the
                  // same fixed height left Dutch Maid's far narrower (and
                  // its fine-detail wordmark harder to read) than the
                  // others even at "the same size". Sized up specifically
                  // for Dutch Maid so its visual weight matches the rest.
                  className={`w-auto object-contain transition duration-300 group-hover:scale-105 ${
                    b.slug === "dutch-maid"
                      ? "h-28 max-w-[88%] sm:h-32"
                      : "h-16 max-w-[75%] sm:h-20"
                  }`}
                />
              </span>
              <span>
                <span className="flex items-center justify-center gap-1 text-base font-semibold text-cream-100">
                  {b.name}
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="shrink-0 text-gold-500 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-1 block text-sm text-cream-100/70">{STRAPS[b.slug]}</span>
              </span>
            </Link>
          </motion.li>
        ))}
        {/* Private label is a fifth, equally prominent card alongside the
            four named brands, per client feedback - it isn't a logo, so it
            gets a plain icon mark on the same cream backing instead. */}
        <motion.li
          className="shrink-0"
          style={{ scrollSnapAlign: "start" }}
          variants={{
            hidden: reduce ? {} : { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <Link href="/private-label" className="group flex w-40 flex-col items-center gap-4 text-center sm:w-48">
            <span className="flex h-36 w-36 items-center justify-center bg-cream-100 shadow-lg shadow-green-900/20 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:h-44 sm:w-44">
              <Package size={56} weight="bold" className="text-green-700" />
            </span>
            <span>
              <span className="flex items-center justify-center gap-1 text-base font-semibold text-cream-100">
                Private Label
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="shrink-0 text-gold-500 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </span>
              <span className="mt-1 block text-sm text-cream-100/70">Manufactured under your own brand.</span>
            </span>
          </Link>
        </motion.li>
      </motion.ul>

      <Link
        href="/brands"
        className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-cream-100/30 px-6 py-3 text-sm font-medium text-cream-100 transition duration-300 hover:-translate-y-0.5 hover:border-cream-100 hover:bg-cream-100/10"
      >
        Explore our brands
      </Link>
    </div>
  );
}
