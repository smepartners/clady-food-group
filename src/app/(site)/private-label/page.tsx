import type { Metadata } from "next";
import {
  Package,
  ChartLineUp,
  Lightning,
  CheckCircle,
  UsersThree,
  CalendarBlank,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import { Section, IconFeature, Pill, CTAButton, ImageFrame, BrandGrid, TextureOverlay, StatTile } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { PrivateLabelHero } from "@/components/private-label-hero";
import { ClientLogoBar } from "@/components/client-logo-bar";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = { title: "Private Label" };

// Same confirmed scale facts as the homepage and About page (see STATS /
// HOME_STATS there) - led with here too, since a procurement contact
// evaluating Clady for a white label programme needs to see this is a
// group with real manufacturing scale before reading about the approach.
const SCALE_STATS = [
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

const PILLARS = [
  { icon: Package, tone: "gold" as const, name: "Product expertise", body: "Knowledge across a broad range of beverage categories and formats." },
  { icon: ChartLineUp, tone: "green" as const, name: "Market awareness", body: "An understanding of changing consumer tastes and emerging beverage trends." },
  { icon: Lightning, tone: "olive" as const, name: "Flexibility", body: "Solutions developed around different customer requirements, channels and price points." },
  { icon: CheckCircle, tone: "gold" as const, name: "Consistency", body: "A focus on dependable product quality and reliable customer relationships." },
  { icon: UsersThree, tone: "green" as const, name: "Collaboration", body: "A partnership approach from initial brief through to finished product." },
];

const MARKETS = ["Vending", "Catering & foodservice", "Retail", "Wholesale", "Food manufacturing"];

export default function PrivateLabelPage() {
  return (
    <>
      <PrivateLabelHero />

      {/* Same move as Home/About: the scale stats and the "more than a
          logo" positioning that used to sit inside the boxed hero now get
          their own full-width band with supporting photography, matching
          how ABF/P&G/Unilever pair a scale statement with its own section
          rather than crowding the hero. */}
      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ImageFrame
              seed="clady-private-label-manufacturing"
              alt="Case packing on Clady Group's production line"
              src="/photo-production-casepacker.jpg"
              aspect="aspect-[4/3]"
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
              More than <em className="italic text-gold-500">a logo on a product.</em>
            </h2>
            <div className="mt-5 space-y-4 text-cream-100/75">
              <p>
                Private label is about creating the right proposition for
                your customers, your market and your commercial objectives -
                backed by real manufacturing scale.
              </p>
              <p>
                Through our portfolio of specialist businesses, we bring
                together expertise across coffee, hot beverages, soluble
                drinks, functional products and beverage ingredients, giving
                customers the flexibility to develop propositions across
                categories, formats, flavours and price points.
              </p>
            </div>
            {/* Tone hardcoded dark - this band's background stays
                green-700 in both preview styles. */}
            <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-8 border-t border-cream-100/15 pt-6">
              {SCALE_STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} tone="dark" />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section pad="py-10 sm:py-14">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
            What we produce
          </p>
          <ImageFrame
            seed="clady-private-label-production-line"
            alt="The packing and labelling line at Clady Group's Buxton site"
            src="/photo-production-packing.jpg"
            aspect="aspect-[16/9]"
            className="mt-6"
          />
        </Reveal>

        {/* Real logo marks on brand-tone badges (see ui.tsx BrandGrid),
            not stock photography standing in for each brand's own
            imagery - same reasoning as the homepage's "Our brands"
            section. */}
        <div className="mt-14 border-t border-cream-200 pt-14">
          <BrandGrid label="The brands we produce for" />
        </div>
      </Section>

      <Section className="bg-green-700">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold text-cream-100 sm:text-3xl">
            A flexible approach
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-cream-100/75">
            <p>
              We work collaboratively with customers to understand the
              opportunity and develop solutions around their needs.
            </p>
            <p>
              Whether you are looking to launch a new proposition, extend an
              existing range or source a proven product under your own brand,
              our capabilities can support you.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            From idea to opportunity
          </h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((p, i) => (
            <IconFeature
              key={p.name}
              icon={<p.icon size={22} weight="bold" />}
              name={p.name}
              body={p.body}
              tone={p.tone}
              index={i + 1}
            />
          ))}
        </RevealStagger>
      </Section>

      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            Across multiple markets
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Our private label capabilities support customers across areas including:
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {MARKETS.map((m) => (
              <li key={m}>
                <Pill>{m}</Pill>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-ink-soft">
            From instant coffee and hot chocolate to functional and wellness
            products, we can help create beverage solutions that fit your brand
            and your market.
          </p>
        </Reveal>
      </Section>

      <Section>
        <ClientLogoBar />
      </Section>

      <Section className="bg-cream-200/40">
        <Testimonials />
      </Section>

      <Section pad="pt-0 pb-14 sm:pb-20">
        <Reveal className="text-center">
          <CTAButton href="/contact">
            Talk to us about your next private label opportunity
          </CTAButton>
        </Reveal>
      </Section>
    </>
  );
}
