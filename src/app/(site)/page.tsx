import Image from "next/image";
import {
  Sparkle,
  Lightbulb,
  CheckCircle,
  Lightning,
  UsersThree,
  CalendarBlank,
  Buildings,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import { Section, CTAButton, TextureOverlay, FacilityStrip, StatTile, AccentRule } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { HomeHero } from "@/components/home-hero";
import { ParallaxBand } from "@/components/parallax-band";
import { BrandCarousel } from "@/components/brand-carousel";

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

const VALUES = [
  { icon: Sparkle, tone: "gold" as const, name: "Excellence", body: "High standards in everything we do, whether that's branded or white labelled." },
  { icon: Lightbulb, tone: "green" as const, name: "Innovation", body: "Looking ahead to what's next, keeping our customers ahead of the trends." },
  { icon: CheckCircle, tone: "olive" as const, name: "Consistency", body: "Reliable quality, flavours and product profiles, every time." },
  { icon: Lightning, tone: "gold" as const, name: "Agility", body: "The world and consumers move fast; that's why we respond quickly to changing needs." },
  {
    icon: UsersThree,
    tone: "green" as const,
    name: "Collaboration",
    body: "Building strong, lasting partnerships that grow with our customers.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
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
            <div className="relative z-10 -mt-8 ml-4 mr-4 grid grid-cols-3 gap-x-4 gap-y-4 rounded-2xl bg-cream-100 p-5 shadow-2xl shadow-green-900/30 sm:-mt-16 sm:ml-10 sm:mr-10 sm:gap-x-6 sm:gap-y-6 sm:p-8">
              {HOME_STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-4">
            <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
              One group. <em className="italic text-gold-500">Multiple capabilities.</em>
            </h2>
            <div className="mt-5 space-y-4 text-cream-100/75">
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
            <FacilityStrip tone="dark" className="mt-8 border-t border-cream-100/15 pt-6" />
          </Reveal>
        </div>
      </Section>

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

      <ParallaxBand
        image="/photo-production-packing.jpg"
        alt="The packing and labelling line at Clady Group's Buxton site"
        eyebrow="Our capability"
        heading="Real manufacturing scale, behind every brand."
        body="From roasting and blending to packing and dispatch, our teams manufacture across three sites in England, Northern Ireland and Ireland - built to support brands and private label customers at volume."
      />

      {/* Rebuilt onto the same dark-green/texture/gold language as the
          hero, capabilities band and brand carousel above it, rather than
          the flat cream SaaS-style cards this used to be - a numbered
          sequence (Unilever's own values band treats its five pillars as a
          numbered row, not an anonymous icon grid) on "glass" panels that
          pick up the gold accent on hover. */}
      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <div className="relative">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
              Our values
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-cream-100 sm:text-4xl">What drives us</h2>
            <AccentRule className="mt-6" />
          </Reveal>
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <div
                key={v.name}
                className="group flex flex-col gap-5 rounded-2xl border border-cream-100/15 bg-cream-100/[0.04] p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-cream-100/[0.07]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 group-hover:scale-105 ${
                      v.tone === "gold"
                        ? "bg-gold-500/15 text-gold-500"
                        : v.tone === "olive"
                          ? "bg-olive-400/15 text-olive-400"
                          : "bg-cream-100/10 text-cream-100"
                    }`}
                  >
                    <v.icon size={22} weight="bold" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-cream-100/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-cream-100">{v.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{v.body}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-green-700 px-8 py-14 text-center sm:px-16">
            <TextureOverlay />
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
            <div className="relative">
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
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
