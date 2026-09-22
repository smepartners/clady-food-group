"use client";

import { Section, AccentRule, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/** Brands index hero - narrower than the other heroes (text only, no image
 * slot), same Bold treatment as the rest of the site. */
export function BrandsHero() {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <Section
      pad="pt-14 sm:pt-16 pb-12 sm:pb-16"
      className={bold ? "relative overflow-hidden bg-green-900" : ""}
    >
      {bold ? <TextureOverlay /> : null}
      <Reveal className="relative">
        <h1
          className={`max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-5xl ${
            bold ? "text-cream-100" : "text-green-700"
          }`}
        >
          A portfolio with{" "}
          <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>a purpose</em>
        </h1>
        <AccentRule className="mt-7" />
        <p
          className={`mt-7 max-w-xl text-lg leading-relaxed ${
            bold ? "text-cream-100/80" : "text-ink-soft"
          }`}
        >
          Our brands operate across complementary areas of the food and drink
          market, each with a clear proposition and specialist focus.
        </p>
      </Reveal>
    </Section>
  );
}
