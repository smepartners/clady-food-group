"use client";

import { Section, ImageFrame, AccentRule, Pill, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/** Individual brand page's hero. The parent route (`brands/[slug]/page.tsx`)
 * must stay an async Server Component for generateStaticParams/
 * generateMetadata/notFound, so only this JSX slice is a client component,
 * receiving the resolved brand as a prop rather than fetching it itself. */
export function BrandDetailHero({
  brand,
}: {
  brand: { name: string; strap: string; focus: string; paragraphs: string[]; seed: string; photo: string };
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
            {brand.name}
          </h1>
          <AccentRule className="mt-7" />
          <p className={`mt-7 text-lg italic ${bold ? "text-cream-100/80" : "text-ink-soft"}`}>
            {brand.strap}
          </p>
          <div className={`mt-6 space-y-4 ${bold ? "text-cream-100/80" : "text-ink-soft"}`}>
            {brand.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul
            className={`mt-8 flex flex-wrap gap-2 border-t pt-6 ${
              bold ? "border-cream-100/15" : "border-cream-200"
            }`}
          >
            {brand.focus.split("·").map((f) => (
              <li key={f}>
                <Pill>{f.trim()}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageFrame
            seed={brand.seed}
            alt={brand.name}
            src={brand.photo}
            aspect="aspect-[4/5]"
            className={bold ? "shadow-2xl shadow-green-900/40 ring-1 ring-cream-100/10" : ""}
          />
        </Reveal>
      </div>
    </Section>
  );
}
