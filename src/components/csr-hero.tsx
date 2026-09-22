"use client";

import { Section, ImageFrame, AccentRule, Lede, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/** CSR's opening hero - same Bold treatment as the rest of the site (see
 * home-hero.tsx). */
export function CsrHero() {
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
            Doing business{" "}
            <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>responsibly</em>
          </h1>
          <AccentRule className="mt-7" />
          <div className="mt-7 space-y-4">
            <Lede tone={bold ? "dark" : "light"}>
              At Clady Group, we believe responsible business is about making
              the right decisions for our people, our customers, our partners
              and the communities in which we operate.
            </Lede>
            <p className={bold ? "text-cream-100/80" : "text-ink-soft"}>
              As our group develops, we are committed to building responsible
              practices into the way we work, from the products we develop and
              the partners we work with to the way we support our people and
              manage our impact.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageFrame
            seed="clady-csr-responsible-sourcing"
            alt="Responsible sourcing at Clady Group"
            src="/photo-csr-sourcing.jpg"
            aspect="aspect-[4/5]"
            className={bold ? "shadow-2xl shadow-green-900/40 ring-1 ring-cream-100/10" : ""}
          />
        </Reveal>
      </div>
    </Section>
  );
}
