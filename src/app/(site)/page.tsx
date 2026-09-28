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
  IconFeature,
  CTAButton,
  TextureOverlay,
  FacilityStrip,
  StatTile,
} from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { HomeHero } from "@/components/home-hero";
import { PhotoShowcase, type ShowcaseItem } from "@/components/photo-showcase";
import { ClientLogoBar } from "@/components/client-logo-bar";
import { Testimonials } from "@/components/testimonials";

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

// Real sourced photography (see public/PHOTO-CREDITS.md). The pallet/
// warehouse shot leads the hero above and the canning line illustrates the
// manufacturing band further down, so this uses the bottling line as its
// lead tile to keep all three photo slots on this page distinct, then the
// four brands. This bento grid now does the job the old standalone "Our
// brands" card row used to do (see DECISIONS.md) - keeping one strong
// brand showcase on the page instead of two was part of the Sept 2026
// section-count trim.
const HOME_SHOWCASE: ShowcaseItem[] = [
  {
    src: "/photo-private-label-bottling.jpg",
    alt: "Beverage bottling line at a Clady Group manufacturing site",
    caption: "Production across the UK & Ireland",
  },
  {
    src: "/photo-brand-evolving-state.jpg",
    alt: "Evolving State product photography",
    caption: "Evolving State",
    href: "/brands/evolving-state",
  },
  {
    src: "/photo-brand-galway-roast.jpg",
    alt: "Galway Roast product photography",
    caption: "Galway Roast",
    href: "/brands/galway-roast",
  },
  {
    src: "/photo-brand-dutch-maid.jpg",
    alt: "Dutch Maid product photography",
    caption: "Dutch Maid",
    href: "/brands/dutch-maid",
  },
  {
    src: "/photo-brand-slumberjack.jpg",
    alt: "Slumberjack product photography",
    caption: "Slumberjack",
    href: "/brands/slumberjack",
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
              alt="Manufacturing operations across England, Northern Ireland and Ireland"
              src="/photo-home-manufacturing.jpg"
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
        <PhotoShowcase items={HOME_SHOWCASE} label="Our portfolio, in pictures" />
        <Link
          href="/brands"
          className="mt-8 inline-block text-sm font-medium text-olive-600 transition hover:text-green-700"
        >
          Explore our brands &rarr;
        </Link>
      </Section>

      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">What drives us</h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((v) => (
            <IconFeature
              key={v.name}
              icon={<v.icon size={22} weight="bold" />}
              name={v.name}
              body={v.body}
              tone={v.tone}
            />
          ))}
        </RevealStagger>
      </Section>

      {/* Client logo bar + testimonials share one Section (rather than two
          separate full-width bands back to back) - part of the Sept 2026
          pass to cut down the homepage's total section count. */}
      <Section>
        <ClientLogoBar />
        <Testimonials className="mt-10" />
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
