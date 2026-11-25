import type { Metadata } from "next";
import {
  Storefront,
  Coffee,
  CoffeeBean,
  ForkKnife,
  Rocket,
  Gift,
  CalendarBlank,
  Buildings,
  Package,
  BagSimple,
  Cylinder,
  Jar,
  StackSimple,
  Basket,
  Tray,
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
  AccentRule,
} from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { WhiteLabelCoffeeHero } from "@/components/white-label-coffee-hero";
import { getWhiteLabelCoffeePageContent } from "@/lib/white-label-coffee-page-data";
import type { WhiteLabelCoffeeSection } from "@/lib/white-label-coffee-page-data";
import { getScaleStats } from "@/lib/private-label-page-data";

export const metadata: Metadata = {
  title: "White Label Coffee",
  description:
    "Own-label and white label coffee, roasted, blended and packed to your specification by Clady Group.",
};

const SECTOR_ICONS: Record<string, typeof Storefront> = { Storefront, Coffee, ForkKnife, Rocket, Gift };
const STAT_ICONS: Record<string, typeof CalendarBlank> = { CalendarBlank, Buildings, Package };

// Generic Phosphor stand-ins for each pack format (Zoe, Nov 2026: "we can do
// a graphic for each pack type to add a visual aspect here"). These are
// icon-set icons, not bespoke pack-shape illustrations - swap for real
// product/pack photography or custom icons if the client wants a more
// literal look per format.
const FORMAT_ICONS: Record<string, typeof Package> = {
  Pouches: BagSimple,
  "Cans & tins": Cylinder,
  Tubes: Jar,
  "Boxes & cartons": Package,
  "Single-portion sticks & sachets": StackSimple,
  "Consumer sizes": Basket,
  "Catering sizes": Tray,
};

const FALLBACK_SCALE_STATS = [
  { value: "12+", label: "Years established, since 2014", icon: "CalendarBlank" },
  { value: "2", label: "Manufacturing sites across the UK", icon: "Buildings" },
  { value: "100s", label: "Specialist and private label brands produced", icon: "Package" },
];

// Rebuilt Nov 2026 (George: "make it so we can reorder sections from
// pages") - every section below the hero, including the group scale
// stats band (previously fixed, pulls from the shared stat documents),
// is now driven by content.sections (an ordered array from Sanity - see
// white-label-coffee-page-data.ts), rendered by renderSection() below.
export default async function WhiteLabelCoffeePage() {
  const [content, liveStats] = await Promise.all([
    getWhiteLabelCoffeePageContent(),
    getScaleStats(),
  ]);
  const SCALE_STATS = liveStats.length ? liveStats : FALLBACK_SCALE_STATS;

  function renderSection(section: WhiteLabelCoffeeSection) {
    if (section.hidden) return null;
    switch (section._type) {
      case "introBlock":
        return (
          // Intro - matches the two-column text/photo layout used for
          // "More than a logo" on Private Label (page.tsx), reused here for
          // the opening capability statement.
          <Section key={section._key}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-lg font-medium leading-relaxed text-ink" : "mt-4 text-ink-soft"}>
                    {p}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.1}>
                <ImageFrame
                  seed="clady-white-label-coffee-intro"
                  alt="Bagged and packed white label coffee product"
                  src={section.image}
                  aspect="aspect-[4/3]"
                />
              </Reveal>
            </div>
          </Section>
        );
      case "sectorsBlock": {
        const sectors = section.sectors ?? [];
        return (
          // Who we supply - five sectors. Rebuilt Nov 2026 per Zoe's
          // feedback: "can the graphics be made larger and then titles and
          // text underneath centralised to them" plus "the background
          // colour on this is too similar to the one above so doesn't
          // provide distinction - maybe a darker colour and/or the
          // monogram". Rather than tint the plain page background, this now
          // gets its own self-contained dark panel - the same "texture
          // background" treatment as AccreditationGrid (deep green, gold
          // leather texture + monogram watermark, content floating on top)
          // - with each sector's icon enlarged into its own cream disc and
          // its title/body centred beneath it.
          <Section key={section._key}>
            <div className="relative overflow-hidden rounded-3xl bg-green-900 px-6 py-12 sm:px-10 sm:py-16">
              <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" blend="mix-blend-soft-light" opacity="opacity-60" />
              <Reveal className="relative">
                <h2 className="text-center text-2xl font-semibold text-cream-100 sm:text-3xl">
                  {section.heading}
                </h2>
              </Reveal>
              <RevealStagger className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                {sectors.map((s) => {
                  const SectorIcon = SECTOR_ICONS[s.icon] ?? Coffee;
                  return (
                    <div key={s.name} className="group flex flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 text-green-700 shadow-lg transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                        <SectorIcon size={28} weight="bold" />
                      </div>
                      <h3 className="mt-4 font-semibold text-cream-100">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{s.body}</p>
                    </div>
                  );
                })}
              </RevealStagger>
            </div>
          </Section>
        );
      }
      case "offerBlock": {
        const bullets = section.bullets ?? [];
        // Split into two even columns of up to 3 (Zoe, Nov 2026: "try 2
        // column section with 3 items each side using a coffee bean as the
        // visual icon for each") rather than interleaving row-by-row.
        const half = Math.ceil(bullets.length / 2);
        const columns = [bullets.slice(0, half), bullets.slice(half)];
        return (
          // What we can offer - photo + bullet list, mirrors the intro's
          // two-column layout with the image on the opposite side.
          //
          // Nov 2026 (Zoe): "the way this is formatted does not make it
          // clear that it's a list" - the bare paragraphs are now a proper
          // two-column list, each item marked with a coffee bean icon
          // rather than relying on layout alone to read as a list.
          <Section key={section._key}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="order-2 lg:order-1">
                <ImageFrame
                  seed="clady-white-label-coffee-offer"
                  alt="Coffee bean and grind variety at Clady Group"
                  src={section.image}
                  aspect="aspect-[4/3]"
                />
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">{section.heading}</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {columns.map((col, colIndex) => (
                    <ul key={colIndex} className="space-y-4">
                      {col.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CoffeeBean size={18} weight="bold" className="mt-0.5 shrink-0 text-gold-700" />
                          <span className="text-sm text-ink-soft">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </Reveal>
            </div>
          </Section>
        );
      }
      case "howItWorksBlock": {
        const steps = section.steps ?? [];
        return (
          // How it works - dark, textured band matching CSR's "Our impact"
          // treatment (gold leather texture + gold watermark on bg-green-900).
          //
          // Nov 2026 (George, 25th): "the horizontal numbered section needs
          // to take on the vertical list style from the homepage" - was a
          // 5-column grid of equal-width cards; rebuilt as the same
          // divide-y stacked row layout as the homepage's "What drives us"
          // band (values-section.tsx's ValuesDarkBand), a fixed-width
          // label column (badge + title) on the left and the body copy on
          // the right. Keeps the plain-digit ring badge rather than
          // switching to an icon - unlike that values list, these are
          // genuinely sequential steps, so the numbering stays.
          <Section key={section._key} className="relative overflow-hidden bg-green-900">
            <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
            <Reveal className="relative max-w-xl">
              <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">{section.heading}</h2>
              <p className="mt-4 text-cream-100/75">{section.intro}</p>
            </Reveal>
            <RevealStagger className="relative mt-12 divide-y divide-cream-100/10 border-t border-cream-100/10">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
                >
                  <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-500 ring-1 ring-inset ring-gold-500/30 transition duration-300 group-hover:scale-105">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-cream-100 sm:text-2xl">{s.title}</h3>
                  </div>
                  <p className="max-w-xl text-cream-100/70 sm:text-lg">{s.body}</p>
                </div>
              ))}
            </RevealStagger>
          </Section>
        );
      }
      case "scaleStatsBlock":
        return (
          // Group scale, reusing the same shared stat documents as Home/
          // About/Private Label (see stat.ts) rather than new page-specific
          // numbers.
          //
          // Nov 2026 (Zoe): "this feels a bit lost as it currently sits/is
          // implemented" - previously a bare row of stats with just a thin
          // top border. Given its own heading, a short supporting line and
          // a tinted, bordered panel so it reads as a deliberate section
          // rather than a leftover strip between how-it-works and
          // innovation.
          <Section key={section._key} pad="py-12 sm:py-16">
            <div className="rounded-3xl border border-cream-200 bg-cream-200/40 px-6 py-10 sm:px-10 sm:py-12">
              <Reveal className="max-w-xl">
                {section.heading ? (
                  <>
                    <AccentRule />
                    <h2 className="mt-4 text-2xl font-semibold text-green-700 sm:text-3xl">
                      {section.heading}
                    </h2>
                  </>
                ) : null}
                {section.intro ? <p className="mt-3 text-ink-soft">{section.intro}</p> : null}
              </Reveal>
              <RevealStagger className="mt-10 grid gap-8 border-t border-cream-200 pt-8 sm:grid-cols-3">
                {SCALE_STATS.map((s) => {
                  const StatIcon = STAT_ICONS[s.icon ?? ""] ?? Package;
                  return (
                    <StatTile key={s.label} value={s.value} label={s.label} icon={<StatIcon size={20} weight="bold" />} />
                  );
                })}
              </RevealStagger>
            </div>
          </Section>
        );
      case "innovationBlock": {
        const cards = section.cards ?? [];
        return (
          // Innovation & blend development - folded into this page rather
          // than built as its own (no independent search volume for
          // "blend development" style terms - see the keyword research).
          <Section key={section._key} className="bg-cream-200/40">
            <Reveal>
              <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">
                {section.heading}
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
        );
      }
      case "formatsBlock": {
        const formats = section.formats ?? [];
        return (
          // Formats we pack into - also folded in (no independent search
          // volume of its own either).
          //
          // Nov 2026 (Zoe): "these lozenges don't work, they feel like they
          // should be clickable/buttons" - the Pill row (which elsewhere on
          // the site IS a real link/button, see ui.tsx's Pill component) was
          // reading as interactive controls, not a plain list of formats.
          // Rebuilt as a grid of static icon tiles instead, so nothing here
          // looks clickable. Icons are generic Phosphor stand-ins per
          // format (see FORMAT_ICONS above) rather than bespoke pack-shape
          // graphics - flagged to the client as a follow-up if they'd
          // rather have real illustrations/photography per format.
          <Section key={section._key}>
            <Reveal>
              <h2 className="text-center text-2xl font-semibold text-green-700 sm:text-3xl">
                {section.heading}
              </h2>
            </Reveal>
            <RevealStagger className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {formats.map((f) => {
                const FormatIcon = FORMAT_ICONS[f] ?? Package;
                return (
                  <div
                    key={f}
                    className="flex flex-col items-center gap-3 rounded-xl border border-cream-200 bg-cream-100 px-4 py-6 text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700/10 text-green-700">
                      <FormatIcon size={20} weight="bold" />
                    </div>
                    <p className="text-sm font-medium text-ink">{f}</p>
                  </div>
                );
              })}
            </RevealStagger>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink-soft">
              {section.note}
            </p>
          </Section>
        );
      }
      case "crossSellBlock":
        return (
          // Cross-sell to powdered drinks - a different product line, so
          // linked out to rather than written in full here.
          <Section key={section._key} pad="pb-14 sm:pb-20">
            <Reveal className="flex flex-col items-center justify-between gap-6 rounded-xl border border-cream-200 bg-cream-200/40 p-8 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="text-lg font-semibold text-ink">{section.heading}</h3>
                <p className="mt-2 text-sm text-ink-soft">{section.body}</p>
              </div>
              <Pill href={section.href}>
                {section.linkLabel}
              </Pill>
            </Reveal>
          </Section>
        );
      case "closingCtaBlock":
        return (
          // Closing CTA - same textured green band as the homepage's
          // closing "Built for better partnerships" section and Private
          // Label's "A flexible approach".
          <section key={section._key} className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
            <TextureOverlay />
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
            <Reveal className="relative">
              <Container>
                <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-cream-100/80">{section.body}</p>
                <div className="mt-8 flex justify-center">
                  <CTAButton href="/contact" tone="inverted">
                    {section.ctaLabel}
                  </CTAButton>
                </div>
              </Container>
            </Reveal>
          </section>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <WhiteLabelCoffeeHero
        subheading={content.hero.subtext}
        image={content.hero.image}
        ctaLabel={content.hero.ctaLabel}
      />
      {content.sections.map(renderSection)}
    </>
  );
}
