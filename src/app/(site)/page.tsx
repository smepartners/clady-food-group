import Image from "next/image";
import { CalendarBlank, Buildings, Package } from "@phosphor-icons/react/dist/ssr";
import { Section, Container, CTAButton, TextureOverlay, FacilityStrip, StatTile } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { HeroSwitcher } from "@/components/hero-switcher";
import { ParallaxBand } from "@/components/parallax-band";
import { BrandCarousel } from "@/components/brand-carousel";
import { ValuesSwitcher } from "@/components/values-section";

// Same three confirmed facts as the About page's "at a glance" band (see
// STATS there). Rendered in the "One group, multiple capabilities" band
// below rather than in the hero itself - checking abf.co.uk, pg.co.uk and
// unilever.co.uk directly showed none of them put stats in the hero; each
// keeps the hero to a pure statement and CTA, and pairs its scale numbers
// with their own supporting section and image further down the page. See
// home-hero.tsx for the fuller note.
const HOME_STATS = [
  { value: "12+", label: "Years established, since 2014", icon: <CalendarBlank size={20} weight="bold" /> },
  {
    value: "3",
    label: "Manufacturing sites across the UK & Ireland",
    icon: <Buildings size={20} weight="bold" />,
  },
  {
    value: `${BRANDS.length}`,
    label: "Specialist brands in the portfolio",
    icon: <Package size={20} weight="bold" />,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSwitcher />

      {/* Light/beige, not dark green - with the hero already dark green,
          opening straight into another dark-green block here read as more
          of the same rather than a new moment, and buried the stat card's
          own shadow/contrast against a background too close to it in
          tone. */}
      <Section className="bg-cream-200/40">
        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[16/11]">
              <Image
                src="/photo-roastery-floor.jpg"
                alt="The roasting floor at Clady Group's Buxton manufacturing site"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            {/* Floats the scale numbers over the image's bottom edge as
                one strong claim, rather than sharing the text column with
                two paragraphs of prose underneath them. */}
            <div className="relative z-10 -mt-8 ml-4 mr-4 grid grid-cols-3 gap-x-4 gap-y-4 rounded-2xl bg-cream-100 p-5 shadow-2xl shadow-green-900/15 sm:-mt-16 sm:ml-10 sm:mr-10 sm:gap-x-6 sm:gap-y-6 sm:p-8">
              {HOME_STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-4">
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
              One group. <em className="italic text-gold-700">Multiple capabilities.</em>
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft">
              <p>
                With manufacturing operations in Buxton, Belfast and Galway,
                Clady Group brings together a broad portfolio of complementary
                expertise across branded beverages, wellness, soluble drinks and
                private label manufacturing.
              </p>
              <p>
                Our scale, capabilities and breadth of experience enable us to
                support customers at every stage, from established brands and
                high-volume production to tailored private label solutions and
                the development of new products from the ground up.
              </p>
            </div>
            <FacilityStrip className="mt-8 border-t border-cream-200 pt-6" />
          </Reveal>
        </div>
      </Section>

      {/* Moved above the brand carousel - this is the group's second
          "capability" moment (its own eyebrow says as much), and grouping
          it with the "One group, multiple capabilities" band above means a
          visitor reads the whole capability story before moving on to the
          brand portfolio, rather than capability/brands/capability
          alternating. */}
      <ParallaxBand
        image="/photo-production-packing.jpg"
        alt="The packing and labelling line at Clady Group's Buxton site"
        eyebrow="Our capability"
        heading="Real manufacturing scale, behind every brand."
        body="From roasting and blending to packing and dispatch, our teams manufacture across three sites in England, Northern Ireland and Ireland - built to support brands and private label customers at volume."
      />

      {/* Bigger, more deliberate moment than a quiet grid at the bottom of
          a photo section: its own full band, horizontally scrollable with
          press-the-arrows navigation, matching how pg.co.uk's own "Our
          Brands" carousel works rather than the static BrandGrid used for
          smaller brand mentions elsewhere on the site. */}
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
        <div className="relative">
          <BrandCarousel />
        </div>
      </Section>

      {/* Four built concepts, switchable live via the fixed pill (bottom
          left) - see values-section.tsx for the rationale. Replaces the
          original five-equal-card grid, which read as disconnected from
          the bolder full-bleed sections around it. */}
      <ValuesSwitcher />

      {/* Full width rather than a contained rounded card, per client
          feedback - matches the brand carousel band above it as an
          edge-to-edge dark green moment instead of a card floating with
          cream margins either side. */}
      <section className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
        <TextureOverlay />
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
        <Reveal className="relative">
          <Container>
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
              Built for better partnerships
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">
              From established beverage brands to private label manufacturing, our
              businesses are designed to make working with us straightforward. We
              combine market knowledge, product expertise and a flexible approach
              to help customers respond to changing consumer expectations and
              commercial opportunities.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" tone="inverted">
                Discover what Clady Group can do for your business
              </CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
