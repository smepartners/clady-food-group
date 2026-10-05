"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { BRANDS } from "@/lib/brands";

// Short one-line straps for each brand - duplicated from the richer copy on
// the /brands index page (see the comment on lib/brands.ts: that page and
// this carousel each carry their own copy rather than overloading the
// shared BRANDS list) so a card reads as more than a logo and a link.
const STRAPS: Record<(typeof BRANDS)[number]["slug"], string> = {
  "evolving-state": "Everyday wellness made easy.",
  "galway-roast": "Coffee with a taste of Galway.",
  "dutch-maid": "Convenience made simple.",
  slumberjack: "Our signature beverage brand.",
};

const BADGE_TONE = {
  green: "bg-green-700",
  gold: "bg-gold-500",
  olive: "bg-olive-600",
} as const;

const RING_TONE = {
  green: "group-hover:ring-green-700/30",
  gold: "group-hover:ring-gold-500/40",
  olive: "group-hover:ring-olive-600/30",
} as const;

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
              <span
                className={`flex h-36 w-36 items-center justify-center rounded-full shadow-lg shadow-green-900/30 ring-4 ring-transparent transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:h-44 sm:w-44 ${BADGE_TONE[b.tone]} ${RING_TONE[b.tone]}`}
              >
                <span className="flex h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full bg-cream-100 transition duration-300 group-hover:scale-105 sm:h-32 sm:w-32">
                  <Image src={b.logo} alt="" width={128} height={64} className="h-11 w-auto object-contain sm:h-12" />
                </span>
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
