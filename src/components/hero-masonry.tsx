"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export type MasonryTile = {
  alt: string;
  /** Tailwind col-span/row-span classes placing the tile in the grid. */
  span: string;
} & (
  | { type: "image"; src: string }
  // `webm` first - smaller, and listed before `mp4` in the `<source>` list
  // so a browser that can play it never bothers downloading the mp4.
  | { type: "video"; webm: string; mp4: string; poster: string }
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * Multi-shot grid replacing a single hero image/video - real, muted,
 * looping clips cut from the company-story video for the shots that
 * actually have footage (short forward/reverse "boomerang" loops, so the
 * clip never jump-cuts back to its start), alongside the client's own
 * site photography for the two shots no video footage covers. More shots
 * of the operation, several of them moving, read as a bigger business
 * than one looping video panel did - see home-hero.tsx and
 * public/PHOTO-CREDITS.md for where each file came from. Each tile zooms
 * gently on hover and the grid animates in on mount (the hero is above
 * the fold, so this fires immediately rather than waiting on scroll like
 * `Reveal`). Video tiles fall back to their poster frame, unplayed, for
 * `prefers-reduced-motion`.
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
          key={t.type === "video" ? t.mp4 : t.src}
          className={`group relative overflow-hidden rounded-xl bg-green-900 sm:rounded-2xl ${t.span}`}
          variants={{
            hidden: reduce ? {} : { opacity: 0, scale: 0.92 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {t.type === "video" && !reduce ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={t.poster}
              aria-label={t.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
            >
              <source src={t.webm} type="video/webm" />
              <source src={t.mp4} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={t.type === "video" ? t.poster : t.src}
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-110"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-green-900/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
