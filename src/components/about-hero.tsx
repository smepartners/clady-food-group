"use client";

import { Section, ImageFrame, AccentRule, Lede, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/** About page's opening hero - same "Bold" dark, textured treatment as the
 * homepage hero (see home-hero.tsx), applied here for consistency across
 * the site rather than leaving About's first impression light while
 * Home's flips dark. */
export function AboutHero() {
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
            A group built around{" "}
            <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>beverage expertise</em>
          </h1>
          <AccentRule className="mt-7" />
          <div className="mt-7 space-y-4">
            <Lede tone={bold ? "dark" : "light"}>
              Clady Group is the parent company behind a growing portfolio of
              specialist food and drink businesses, bringing together
              complementary brands, capabilities and expertise.
            </Lede>
            <p className={bold ? "text-cream-100/80" : "text-ink-soft"}>
              Established in 2014 through Slumberjack, the group has developed
              from its family-business roots into a broader platform serving
              customers across branded and private label markets.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageFrame
            seed="clady-about-team"
            alt="The Clady Group team at work"
            src="/photo-about-team.jpg"
            aspect="aspect-[4/5]"
            className={bold ? "shadow-2xl shadow-green-900/40 ring-1 ring-cream-100/10" : ""}
          />
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <div className={`relative mt-16 max-w-2xl space-y-4 border-t pt-10 ${bold ? "border-cream-100/15" : "border-cream-200"}`}>
          <Lede tone={bold ? "dark" : "light"}>
            Today, our portfolio spans coffee, tea, hot chocolate, functional
            beverages, wellness products, soluble drinks and beverage
            ingredients.
          </Lede>
          <p className={bold ? "text-cream-100/80" : "text-ink-soft"}>
            Each business has its own identity and area of expertise. Together,
            they give our customers access to a broader range of products,
            capabilities and commercial opportunities.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
