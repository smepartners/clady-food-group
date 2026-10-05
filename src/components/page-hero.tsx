"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Container, CTAButton, AccentRule } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * Shared full-bleed image hero - the "corporate scale" pattern established
 * on the homepage (see home-hero.tsx) rolled out across the rest of the
 * site. Client feedback ahead of the Sept 2026 design review was that only
 * the homepage was making the brand punch at the level abf.co.uk, pg.co.uk
 * and unilever.co.uk do, while "the rest of the page looks untouched" -
 * every other page still opened on the old boxed, half-width split hero.
 * This is the same statement-plus-single-CTA-over-photography treatment as
 * HomeHero, factored out so About/Brands/Private Label/CSR/Contact/brand
 * detail pages all open the same confident way instead of six near-copies
 * of the pattern drifting apart. Secondary content that used to live
 * inside each page's boxed hero (lede paragraphs, stat rows, forms, brand
 * grids) has moved to its own section immediately below, mirroring how the
 * homepage moved its stat row into the "One group, multiple capabilities"
 * band rather than crowding the hero.
 */
export function PageHero({
  image,
  alt,
  eyebrow = "Clady Group",
  heading,
  subheading,
  cta,
  compact = false,
  logo,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  cta?: { href: string; label: string };
  /** Shorter vertical rhythm for pages whose hero is the whole point (e.g.
   * a brand detail page that follows straight into its own content) rather
   * than a full landing moment. */
  compact?: boolean;
  /** A brand's real logo mark (brand detail pages only - see
   * public/PHOTO-CREDITS.md) rendered as a white chip above the heading,
   * next to the plain-text eyebrow rather than replacing it. */
  logo?: string;
}) {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <section className="relative isolate overflow-hidden bg-green-900">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          bold
            ? "from-green-900 via-green-900/88 to-green-900/55"
            : "from-green-900/95 via-green-900/75 to-green-900/40"
        }`}
      />

      <Container>
        <Reveal
          className={`relative ${
            compact ? "pt-24 pb-16 sm:pt-28 sm:pb-20" : "pt-28 pb-20 sm:pt-40 sm:pb-28"
          }`}
        >
          <p
            className={`text-sm font-semibold uppercase tracking-[0.16em] ${
              bold ? "text-gold-500" : "text-gold-500/90"
            }`}
          >
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl">
            {heading}
          </h1>
          {logo ? (
            <div className="mt-5 flex h-12 w-fit items-center rounded-lg bg-cream-100/95 px-3">
              <Image src={logo} alt="" width={140} height={48} className="h-7 w-auto object-contain" />
            </div>
          ) : null}
          <AccentRule className="mt-7" />
          {subheading ? (
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream-100/85">
              {subheading}
            </p>
          ) : null}
          {cta ? (
            <div className="mt-10">
              <CTAButton href={cta.href} tone="inverted">
                {cta.label}
              </CTAButton>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
