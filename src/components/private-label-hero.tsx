"use client";

import { Section, ImageFrame, AccentRule, Lede, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScaleBand } from "@/components/scale-band";
import { useSiteStyle } from "@/components/site-theme";

/** Private Label's opening hero - same Bold treatment as Home/About (see
 * home-hero.tsx). This is the page most likely to be read by a procurement
 * contact sizing Clady up for a white label programme, so it's one of the
 * highest-leverage pages for the "look bigger" brief - stats now render via
 * the shared ScaleBand rather than a bespoke RevealStagger block. */
export function PrivateLabelHero({
  stats,
}: {
  stats: { value: string; label: string }[];
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
            className={`text-4xl font-semibold leading-[1.05] sm:text-5xl ${
              bold ? "text-cream-100" : "text-green-700"
            }`}
          >
            Your brand.{" "}
            <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>Our expertise.</em>
          </h1>
          <AccentRule className="mt-7" />
          <div className={`mt-7 space-y-4 ${bold ? "text-cream-100/80" : "text-ink-soft"}`}>
            <p>
              From concept to finished product, Clady Group provides private
              label beverage solutions designed around your requirements.
            </p>
            <p>
              Private label is more than putting a logo on a product. It is
              about creating the right proposition for your customers, your
              market and your commercial objectives.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageFrame
            seed="clady-private-label-bottling"
            alt="Private label beverage production line"
            src="/photo-private-label-bottling.jpg"
            aspect="aspect-[4/5]"
            className={bold ? "shadow-2xl shadow-green-900/40 ring-1 ring-cream-100/10" : ""}
          />
        </Reveal>
      </div>
      <Reveal>
        <ScaleBand
          stats={stats}
          className={`relative mt-16 border-t pt-10 ${bold ? "border-cream-100/15" : "border-cream-200"}`}
        />
      </Reveal>
      <Reveal delay={0.15}>
        <div className="relative mt-10 max-w-2xl space-y-4">
          <Lede tone={bold ? "dark" : "light"}>
            Through our portfolio of specialist businesses, we bring together
            expertise across coffee, hot beverages, soluble drinks, functional
            products and beverage ingredients.
          </Lede>
          <p className={bold ? "text-cream-100/80" : "text-ink-soft"}>
            This gives our customers the flexibility to develop propositions
            across categories, formats, flavours and price points.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
