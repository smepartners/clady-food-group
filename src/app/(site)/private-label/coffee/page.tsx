import type { Metadata } from "next";
import {
  Storefront,
  Coffee,
  ForkKnife,
  Rocket,
  Gift,
  CalendarBlank,
  Buildings,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import {
  Section,
  Container,
  CTAButton,
  ImageFrame,
  TextureOverlay,
  StatTile,
  IconFeature,
  Pill,
} from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { WhiteLabelCoffeeHero } from "@/components/white-label-coffee-hero";
import { getWhiteLabelCoffeePageContent } from "@/lib/white-label-coffee-page-data";
import { getScaleStats } from "@/lib/private-label-page-data";

export const metadata: Metadata = {
  title: "White Label Coffee",
  description:
    "Own-label and white label coffee, roasted, blended and packed to your specification by Clady Group.",
};

const SECTOR_ICONS: Record<string, typeof Storefront> = { Storefront, Coffee, ForkKnife, Rocket, Gift };
const STAT_ICONS: Record<string, typeof CalendarBlank> = { CalendarBlank, Buildings, Package };

const FALLBACK_SCALE_STATS = [
  { value: "12+", label: "Years established, since 2014", icon: "CalendarBlank" },
  { value: "2", label: "Manufacturing sites across the UK", icon: "Buildings" },
  { value: "100s", label: "Specialist and private label brands produced", icon: "Package" },
];

export default async function WhiteLabelCoffeePage() {
  const [content, liveStats] = await Promise.all([
    getWhiteLabelCoffeePageContent(),
    getScaleStats(),
  ]);
  const SCALE_STATS = liveStats.length ? liveStats : FALLBACK_SCALE_STATS;
  const sectors = content.sectorsSection.sectors ?? [];
  const steps = content.howItWorksSection.steps ?? [];
  const cards = content.innovationSection.cards ?? [];
  const formats = content.formatsSection.formats ?? [];

  return (
    <>
      <WhiteLabelCoffeeHero
        subheading={content.hero.subtext}
        image={content.hero.image}
        ctaLabel={content.hero.ctaLabel}
      />

      {/* Intro - matches the two-column text/photo layout used for
          "More than a logo" on Private Label (page.tsx), reused here for
          the opening capability statement. */}
{!content.introSection.hidden && (
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {content.introSection.paragraphs?.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg font-medium leading-relaxed text-ink" : "mt-4 text-ink-soft"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              seed="clady-white-label-coffee-intro"
              alt="Bagged and packed white label coffee product"
              src={content.introSection.image}
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </Section>
      )}

      {/* Who we supply - five sectors, same IconFeature card used for
          "What drives us"/pillar-style grids elsewhere on the site. */}
{!content.sectorsSection.hidden && (
      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">
            {content.sectorsSection.heading}
          </h2>
        </Reveal>
        <RevealStagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((s) => {
            const SectorIcon = SECTOR_ICONS[s.icon] ?? Coffee;
            return (
              <IconFeature
                key={s.name}
                icon={<SectorIcon size={20} weight="bold" />}
                name={s.name}
                body={s.body}
                tone={s.tone}
              />
            );
          })}
        </RevealStagger>
      </Section>
      )}

      {/* What we can offer - photo + bullet list, mirrors the intro's
          two-column layout with the image on the opposite side. */}
{!content.offerSection.hidden && (
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ImageFrame
              seed="clady-white-label-coffee-offer"
              alt="Coffee bean and grind variety at Clady Group"
              src={content.offerSection.image}
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">{content.offerSection.heading}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {content.offerSection.bullets?.map((b, i) => (
                <p key={i} className="text-sm text-ink-soft">{b}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
      )}

      {/* How it works - dark, textured band matching CSR's "Our impact"
          treatment (gold leather texture + gold watermark on bg-green-900),
          per client feedback that the page needed more texture/colour
          variety rather than sitting on one flat tone throughout. Plain
          digits in a ring badge (not icons, not leading-zero step
          numbers) since these are sequential steps, not categorised
          features. */}
{!content.howItWorksSection.hidden && (
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
        <Reveal className="relative">
          <h2 className="text-center text-2xl font-semibold text-cream-100 sm:text-3xl">
            {content.howItWorksSection.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-cream-100/75">
            {content.howItWorksSection.intro}
          </p>
          <RevealStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-500">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-cream-100">{s.title}</h3>
                <p className="text-sm leading-relaxed text-cream-100/75">{s.body}</p>
              </div>
            ))}
          </RevealStagger>
        </Reveal>
      </Section>
      )}

      {/* Group scale, reusing the same shared stat documents as Home/
          About/Private Label (see stat.ts) rather than new page-specific
          numbers. */}
      <Section pad="py-12 sm:py-16">
        <RevealStagger className="grid gap-8 border-t border-cream-200 pt-10 sm:grid-cols-3">
          {SCALE_STATS.map((s) => {
            const StatIcon = STAT_ICONS[s.icon ?? ""] ?? Package;
            return (
              <StatTile key={s.label} value={s.value} label={s.label} icon={<StatIcon size={20} weight="bold" />} />
            );
          })}
        </RevealStagger>
      </Section>

      {/* Innovation & blend development - folded into this page rather
          than built as its own (no independent search volume for
          "blend development" style terms - see the keyword research). */}
{!content.innovationSection.hidden && (
      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">
            {content.innovationSection.heading}
          </h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-8 sm:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-cream-200 bg-cream-100 p-6">
              <h3 className="font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          ))}
        </RevealStagger>
      </Section>
      )}

      {/* Formats we pack into - also folded in (no independent search
          volume of its own either). */}
{!content.formatsSection.hidden && (
      <Section>
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">
            {content.formatsSection.heading}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {formats.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-ink-soft">
            {content.formatsSection.note}
          </p>
        </Reveal>
      </Section>
      )}

      {/* Cross-sell to powdered drinks - a different product line, so
          linked out to rather than written in full here. */}
{!content.crossSellSection.hidden && (
      <Section pad="pb-14 sm:pb-20">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-xl border border-cream-200 bg-cream-200/40 p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-ink">{content.crossSellSection.heading}</h3>
            <p className="mt-2 text-sm text-ink-soft">{content.crossSellSection.body}</p>
          </div>
          <Pill href={content.crossSellSection.href}>
            {content.crossSellSection.linkLabel}
          </Pill>
        </Reveal>
      </Section>
      )}

      {/* Closing CTA - same textured green band as the homepage's
          closing "Built for better partnerships" section and Private
          Label's "A flexible approach". */}
{!content.closingCta.hidden && (
      <section className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
        <TextureOverlay />
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
        <Reveal className="relative">
          <Container>
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
              {content.closingCta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">{content.closingCta.body}</p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" tone="inverted">
                {content.closingCta.ctaLabel}
              </CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>
      )}
    </>
  );
}
