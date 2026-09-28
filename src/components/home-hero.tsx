"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Container, CTAButton, AccentRule, StatTile } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * Full-bleed homepage hero: real manufacturing photography edge-to-edge
 * behind the headline and a stat bar, replacing the earlier split
 * headline-and-thumbnail layout. Client feedback ahead of the Sept 2026
 * design review call was that the site "isn't making the brand punch at
 * the level it needs to in terms of the corporate feel" next to reference
 * sites (abf.co.uk, pg.co.uk, unilever.co.uk), and specifically suggested
 * "a product range image... becomes the hero spot at the top of the page".
 * This borrows that convention - a full-width scale photograph is the
 * first thing a visitor sees, with the stat row now living in-hero on a
 * dark bar rather than as a separate block underneath.
 *
 * `HERO_IMAGE` is the group's own warehouse/pallet photography (the
 * existing "Home hero" slot - see public/PHOTO-CREDITS.md) standing in for
 * the actual product-range imagery the client is bringing to that call -
 * swap it for that once supplied, no layout change needed.
 *
 * The three "why work with us" intro paragraphs that used to sit under the
 * stat row were cut rather than carried into this hero - they read as
 * filler next to the concrete scale signals the client actually asked for,
 * and were part of what made the homepage feel like too many sections in
 * a row. See DECISIONS.md.
 */
const HERO_IMAGE = "/photo-home-hero.jpg";

export function HomeHero({
  stats,
}: {
  stats: { value: string; label: string; icon?: ReactNode }[];
}) {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <section className="bg-green-900">
      <div className="relative isolate overflow-hidden">
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
          <Reveal className="relative pt-28 pb-16 sm:pt-40 sm:pb-24">
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
      </div>

      <div className="border-t border-cream-100/15">
        <Container>
          <RevealStagger className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-3 sm:py-12">
            {stats.map((s) => (
              <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} size="lg" tone="dark" />
            ))}
          </RevealStagger>
        </Container>
      </div>
    </section>
  );
}
