"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export type MasonryTile = {
  src: string;
  alt: string;
  /** Tailwind col-span/row-span classes placing the tile in the grid. */
  span: string;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * Multi-shot grid replacing a single hero image/video - six real shots from
 * around the business (the Buxton site, the roastery floor, packing and
 * casepacking lines, plus three frame grabs pulled from the company-story
 * video for process/equipment detail no single photo covers) rather than
 * one picture standing in for the whole group. Each tile zooms gently on
 * hover and the grid animates in on mount (the hero is above the fold, so
 * this fires immediately rather than waiting on scroll like `Reveal`).
 */
export function HeroMasonry({ tiles }: { tiles: MasonryTile[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid aspect-[4/5] grid-cols-4 grid-rows-3 gap-3 sm:gap-4"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {tiles.map((t) => (
        <motion.div
          key={t.src}
          className={`group relative overflow-hidden rounded-xl bg-green-900 sm:rounded-2xl ${t.span}`}
          variants={{
            hidden: reduce ? {} : { opacity: 0, scale: 0.92 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <Image
            src={t.src}
            alt={t.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-green-900/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
