"use client";

import type { ReactNode } from "react";
import { Section, ImageFrame, CTAButton, AccentRule, TextureOverlay, StatTile } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * The homepage hero, stat row and numbered intro - its own component (like
 * every other page's hero, see about-hero.tsx etc.) because this is the
 * block the "Bold" preview style (see site-theme.tsx) reskins on every
 * page: a deep green, textured background in place of the plain cream one.
 */
export function HomeHero({
  stats,
  introPoints,
}: {
  stats: { value: string; label: string; icon?: ReactNode }[];
  introPoints: string[];
}) {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <Section
      pad="pt-14 sm:pt-16 pb-12 sm:pb-16"
      className={bold ? "relative overflow-hidden bg-green-900" : ""}
    >
      {bold ? <TextureOverlay /> : null}
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h1
            className={`max-w-xl text-4xl font-semibold leading-[1.05] sm:text-5xl ${
              bold ? "text-cream-100" : "text-green-700"
            }`}
          >
            Built around{" "}
            <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>your business.</em>
          </h1>
          <AccentRule className="mt-7" />
          <p
            className={`mt-7 max-w-lg text-lg leading-relaxed ${
              bold ? "text-cream-100/80" : "text-ink-soft"
            }`}
          >
            Clady Group brings together a portfolio of specialist food, confectionery
            and beverage brands and capabilities, delivering quality, choice and
            flexibility to customers across B2B and B2C markets.
          </p>
          <div className="mt-10">
            <CTAButton href="/brands" tone={bold ? "inverted" : "solid"}>
              Explore our brands
            </CTAButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageFrame
            seed="clady-group-coffee-roastery"
            alt="Coffee roasting and beverage production at a Clady Group facility"
            src="/photo-home-hero.jpg"
            aspect="aspect-[4/5] lg:aspect-square"
            priority
            className={bold ? "shadow-2xl shadow-green-900/40 ring-1 ring-cream-100/10" : ""}
          />
        </Reveal>
      </div>

      <RevealStagger
        className={`relative mt-12 grid gap-x-8 gap-y-10 border-t pt-12 sm:grid-cols-3 ${
          bold ? "border-cream-100/15" : "border-cream-200"
        }`}
      >
        {stats.map((s) => (
          <StatTile
            key={s.label}
            value={s.value}
            label={s.label}
            icon={s.icon}
            size="lg"
            tone={bold ? "dark" : "light"}
          />
        ))}
      </RevealStagger>

      <RevealStagger
        className={`relative mt-12 grid gap-x-8 gap-y-10 border-t pt-12 sm:grid-cols-3 ${
          bold ? "border-cream-100/15" : "border-cream-200"
        }`}
      >
        {introPoints.map((point, i) => (
          <div key={i} className="flex flex-col gap-3">
            <span
              className={`text-sm font-semibold tabular-nums ${
                bold ? "text-gold-500/80" : "text-gold-700/70"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className={bold ? "text-cream-100/75" : "text-ink-soft"}>{point}</p>
          </div>
        ))}
      </RevealStagger>
    </Section>
  );
}
