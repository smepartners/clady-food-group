"use client";

import Image from "next/image";
import { Container, CTAButton, AccentRule } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * Full-bleed homepage hero: real manufacturing photography edge-to-edge
 * behind the headline, replacing the earlier split headline-and-thumbnail
 * layout. Client feedback ahead of the Sept 2026 design review call was
 * that the site "isn't making the brand punch at the level it needs to in
 * terms of the corporate feel" next to reference sites (abf.co.uk,
 * pg.co.uk, unilever.co.uk), and specifically suggested "a product range
 * image... becomes the hero spot at the top of the page".
 *
 * Checking those three sites directly (rather than working from a general
 * impression of the category) showed none of them put stats in the hero -
 * it's a pure statement plus one CTA over the image/video (ABF: "Together
 * we are ABF"; Unilever: "Welcome to Unilever UK"). The scale numbers
 * live in their own section further down, paired with their own
 * supporting image (ABF pairs "138,000 employees in 56 countries" with
 * aerial photography). This hero now follows that pattern - the stat row
 * that used to sit in a bar under the hero has moved into the "One group,
 * multiple capabilities" band below (see page.tsx), next to its own
 * photography, rather than living here.
 *
 * `HERO_IMAGE` is the group's own warehouse/pallet photography (the
 * existing "Home hero" slot - see public/PHOTO-CREDITS.md) standing in for
 * the actual product-range imagery the client is bringing to that call -
 * swap it for that once supplied, no layout change needed.
 */
const HERO_IMAGE = "/photo-home-hero.jpg";

export function HomeHero() {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <section className="relative isolate overflow-hidden bg-green-900">
      <Image
        src={HERO_IMAGE}
        alt="Pallets of finished product ready for despatch at a Clady Group manufacturing site"
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
        <Reveal className="relative pt-28 pb-20 sm:pt-40 sm:pb-28">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.16em] ${
              bold ? "text-gold-500" : "text-gold-500/90"
            }`}
          >
            Clady Group
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl">
            Built around <em className="italic text-gold-500">your business.</em>
          </h1>
          <AccentRule className="mt-7" />
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream-100/85">
            A group of specialist food, confectionery and beverage brands and
            capabilities, delivering quality, choice and flexibility to
            customers across B2B and B2C markets.
          </p>
          <div className="mt-10">
            <CTAButton href="/brands" tone="inverted">
              Explore our brands
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
