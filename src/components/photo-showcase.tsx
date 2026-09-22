"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

export type ShowcaseItem = {
  src: string;
  alt: string;
  caption: string;
  href?: string;
  /** First item in the array renders as the large tile - this just labels
   * intent at the call site rather than being inferred from array position. */
  large?: boolean;
};

/**
 * Bento-style photography grid - real sourced production/brand photography
 * (see public/PHOTO-CREDITS.md) laid out as one large lead image plus four
 * supporting tiles, rather than another uniform card row. Built to make the
 * group's manufacturing scale and brand range feel tangible at a glance:
 * client feedback (Sept 2026) was that the site read smaller than the
 * business actually is, and photography carries that better than another
 * stat ever will. Each tile links through to the relevant brand page where
 * an href is supplied. Caption sits on a permanent gradient scrim (not just
 * on hover) so it reads on touch devices too, with a small lift + arrow
 * nudge on hover for pointer users.
 */
export function PhotoShowcase({
  items,
  label,
  className = "",
}: {
  items: ShowcaseItem[];
  label?: string;
  className?: string;
}) {
  const { style } = useSiteStyle();
  const bold = style === "bold";
  const [hero, ...rest] = items;

  return (
    <div className={className}>
      {label ? (
        <p
          className={`mb-6 text-sm font-semibold uppercase tracking-wide ${
            bold ? "text-gold-500" : "text-olive-600"
          }`}
        >
          {label}
        </p>
      ) : null}
      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2">
        <Tile item={hero} className="col-span-2 row-span-2 aspect-square sm:aspect-auto" />
        {rest.map((item) => (
          <Tile key={item.src} item={item} className="aspect-square" />
        ))}
      </Reveal>
    </div>
  );
}

function Tile({ item, className = "" }: { item: ShowcaseItem; className?: string }) {
  const inner = (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 640px) 25vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/0 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
        <span className="text-sm font-semibold text-cream-100">{item.caption}</span>
        {item.href ? (
          <ArrowUpRight
            size={16}
            weight="bold"
            className="shrink-0 text-cream-100/80 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-500"
          />
        ) : null}
      </div>
    </>
  );

  const tileClassName = `group relative block overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 ${className}`;

  return item.href ? (
    <Link href={item.href} aria-label={item.caption} className={tileClassName}>
      {inner}
    </Link>
  ) : (
    <div className={tileClassName}>{inner}</div>
  );
}
