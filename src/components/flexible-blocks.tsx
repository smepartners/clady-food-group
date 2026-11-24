import {
  Storefront,
  Coffee,
  ForkKnife,
  Rocket,
  Gift,
  Package,
  ChartLineUp,
  Lightning,
  CheckCircle,
  UsersThree,
  Leaf,
  Handshake,
  Buildings,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import { Section, Container, CTAButton, ImageFrame, TextureOverlay, IconFeature, Pill, StatTile } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import type { FlexibleSection, Tone } from "@/lib/flexible-page-data";

/** Renders the fixed library of section "blocks" a `flexiblePage` can be
 * built from (see schemaTypes/flexiblePage.ts) - each block reuses the
 * same UI primitives and visual language as the hand-built pages, so a
 * client-assembled page still looks like the rest of the site rather than
 * a generic page-builder aesthetic of its own. */

const GRID_ICONS: Record<string, typeof Storefront> = {
  Storefront, Coffee, ForkKnife, Rocket, Gift, Package, ChartLineUp,
  Lightning, CheckCircle, UsersThree, Leaf, Handshake, Buildings, CalendarBlank,
};

const TONE_CLASS: Record<Tone, string> = {
  white: "",
  cream: "bg-cream-200/40",
};

export function FlexibleBlocks({ blocks }: { blocks: FlexibleSection[] }) {
  return (
    <>
      {blocks.map((block) => {
        if (block.hidden) return null;
        switch (block._type) {
          case "textImageBlock":
            return <TextImageBlock key={block._key} block={block} />;
          case "iconGridBlock":
            return <IconGridBlock key={block._key} block={block} />;
          case "statsBlock":
            return <StatsBlock key={block._key} block={block} />;
          case "cardsBlock":
            return <CardsBlock key={block._key} block={block} />;
          case "pillsBlock":
            return <PillsBlock key={block._key} block={block} />;
          case "texturedCtaBlock":
            return <TexturedCtaBlock key={block._key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function TextImageBlock({ block }: { block: Extract<FlexibleSection, { _type: "textImageBlock" }> }) {
  const imageFirst = block.imagePosition === "left";
  return (
    <Section className={TONE_CLASS[block.tone ?? "white"]}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={imageFirst ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
          {block.heading ? (
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">{block.heading}</h2>
          ) : null}
          <div className="mt-5 space-y-4 text-ink-soft">
            {block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
        <Reveal delay={0.1} className={imageFirst ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
          <ImageFrame seed={`flexible-${block._key}`} alt={block.heading ?? "Photo"} src={block.image} aspect="aspect-[4/3]" />
        </Reveal>
      </div>
    </Section>
  );
}

function IconGridBlock({ block }: { block: Extract<FlexibleSection, { _type: "iconGridBlock" }> }) {
  const items = block.items ?? [];
  return (
    <Section className={TONE_CLASS[block.tone ?? "cream"]}>
      {block.heading ? (
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">{block.heading}</h2>
        </Reveal>
      ) : null}
      <RevealStagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = GRID_ICONS[item.icon ?? ""] ?? Package;
          return (
            <IconFeature
              key={item.name ?? i}
              icon={<Icon size={20} weight="bold" />}
              name={item.name ?? ""}
              body={item.body ?? ""}
              tone={item.tone ?? "green"}
            />
          );
        })}
      </RevealStagger>
    </Section>
  );
}

function StatsBlock({ block }: { block: Extract<FlexibleSection, { _type: "statsBlock" }> }) {
  const items = block.items ?? [];
  return (
    <Section className={TONE_CLASS[block.tone ?? "white"]} pad="py-12 sm:py-16">
      <RevealStagger className="grid gap-8 border-t border-cream-200 pt-10 sm:grid-cols-3">
        {items.map((item, i) => (
          <StatTile key={i} value={item.value ?? ""} label={item.label ?? ""} />
        ))}
      </RevealStagger>
    </Section>
  );
}

function CardsBlock({ block }: { block: Extract<FlexibleSection, { _type: "cardsBlock" }> }) {
  const cards = block.cards ?? [];
  return (
    <Section className={TONE_CLASS[block.tone ?? "cream"]}>
      {block.heading ? (
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">{block.heading}</h2>
        </Reveal>
      ) : null}
      <RevealStagger className="mt-10 grid gap-8 sm:grid-cols-2">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-cream-200 bg-cream-100 p-6">
            {c.title ? <h3 className="font-semibold text-ink">{c.title}</h3> : null}
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}
      </RevealStagger>
    </Section>
  );
}

function PillsBlock({ block }: { block: Extract<FlexibleSection, { _type: "pillsBlock" }> }) {
  const pills = block.pills ?? [];
  return (
    <Section className={TONE_CLASS[block.tone ?? "white"]}>
      <Reveal>
        {block.heading ? (
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">{block.heading}</h2>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {pills.map((p, i) => <Pill key={i}>{p}</Pill>)}
        </div>
        {block.note ? (
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-ink-soft">{block.note}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}

function TexturedCtaBlock({ block }: { block: Extract<FlexibleSection, { _type: "texturedCtaBlock" }> }) {
  const dark = block.style === "gold-texture";
  return (
    <section className={`relative overflow-hidden py-14 text-center sm:py-20 ${dark ? "bg-green-900" : "bg-green-700"}`}>
      {dark ? (
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
      ) : (
        <TextureOverlay />
      )}
      <Reveal className="relative">
        <Container>
          {block.heading ? (
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">{block.heading}</h2>
          ) : null}
          {block.body ? <p className="mx-auto mt-4 max-w-xl text-cream-100/80">{block.body}</p> : null}
          {block.ctaLabel && block.ctaHref ? (
            <div className="mt-8 flex justify-center">
              <CTAButton href={block.ctaHref} tone="inverted">
                {block.ctaLabel}
              </CTAButton>
            </div>
          ) : null}
        </Container>
      </Reveal>
    </section>
  );
}
