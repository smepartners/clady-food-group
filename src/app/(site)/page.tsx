import Link from "next/link";
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
import {
  Section,
  ImageFrame,
  BrandGrid,
  CTAButton,
  TextureOverlay,
  FacilityStrip,
  StatTile,
} from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { HomeHero } from "@/components/home-hero";
import { ParallaxBand } from "@/components/parallax-band";

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
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ImageFrame
              seed="clady-manufacturing-northern-ireland"
              alt="The roasting floor at Clady Group's Buxton manufacturing site"
              src="/photo-roastery-floor.jpg"
              aspect="aspect-[4/3]"
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
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
            {/* Scale numbers live here rather than in the hero - see
                HOME_STATS above for why. */}
            <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-8 border-t border-cream-100/15 pt-6">
              {HOME_STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} tone="dark" />
              ))}
            </div>
            <FacilityStrip tone="dark" className="mt-6 border-t border-cream-100/15 pt-6" />
          </Reveal>
        </div>
      </Section>

      <Section pad="py-10 sm:py-14">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
            Our site, in pictures
          </p>
          <ImageFrame
            seed="clady-home-site-aerial"
            alt="Aerial view of the Clady Group manufacturing site in Buxton"
            src="/photo-site-aerial.jpg"
            aspect="aspect-[16/9]"
            className="mt-6"
          />
        </Reveal>

        {/* Real logo marks on brand-tone badges (see ui.tsx BrandGrid) -
            product/lifestyle stock photography used to stand in behind
            these logos; now that every brand has its own real mark, the
            logo carries the tile on its own rather than sharing it with a
            photo that isn't actually that brand's own photography. The
            same treatment P&G uses for "Our Brands" on pg.co.uk. */}
        <div className="mt-14 border-t border-cream-200 pt-14">
          <BrandGrid label="Our brands" />
          <Link
            href="/brands"
            className="mt-8 inline-block text-sm font-medium text-olive-600 transition hover:text-green-700"
          >
            Explore our brands &rarr;
          </Link>
        </div>
      </Section>

      <ParallaxBand
        image="/photo-production-packing.jpg"
        alt="The packing and labelling line at Clady Group's Buxton site"
        eyebrow="Our capability"
        heading="Real manufacturing scale, behind every brand."
        body="From roasting and blending to packing and dispatch, our teams manufacture across three sites in England, Northern Ireland and Ireland - built to support brands and private label customers at volume."
      />

      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">What drives us</h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((v) => (
            <div
              key={v.name}
              className="group flex flex-col items-center gap-4 rounded-3xl border border-cream-200 bg-cream-100 p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full transition duration-300 group-hover:scale-105 ${
                  v.tone === "gold"
                    ? "bg-gold-500/15 text-gold-700"
                    : v.tone === "olive"
                      ? "bg-olive-600/10 text-olive-600"
                      : "bg-green-700/10 text-green-700"
                }`}
              >
                <v.icon size={26} weight="bold" />
              </span>
              <h3 className="font-semibold text-ink">{v.name}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{v.body}</p>
            </div>
          ))}
        </RevealStagger>
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
