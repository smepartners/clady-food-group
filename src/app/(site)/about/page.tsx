import type { Metadata } from "next";
import { Section, Pending, ImageFrame, AccentRule, Lede, PullQuote, StatTile, Pill, BrandGrid, TextureOverlay } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

export const metadata: Metadata = { title: "About Us" };

// Established 2014 (Slumberjack) - kept as a literal rather than computed
// from the current date, so the stat doesn't silently drift as years pass.
// Update by hand at the next content refresh.
const STATS = [
  { value: "12+", label: "Years established, since 2014" },
  { value: "3", label: "Manufacturing locations: Buxton, Belfast & Galway" },
];

const SECTORS = ["Retail", "Cafés", "Food service", "Hospitality"];

// Accreditations confirmed by the client (Zoe, SME Partners) - held across
// the portfolio rather than by any single brand, so presented as a
// group-wide list rather than attributed brand-by-brand pending further
// guidance on how the client wants that split shown.
const ACCREDITATIONS = ["Rainforest Alliance", "Fairtrade", "BRCGS Start Basic", "SALSA"];

export default function AboutPage() {
  return (
    <>
      <Section pad="pt-14 sm:pt-16 pb-12 sm:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
              A group built around <em className="italic text-gold-700">beverage expertise</em>
            </h1>
            <AccentRule className="mt-7" />
            <div className="mt-7 space-y-4">
              <Lede>
                Clady Group is the parent company behind a growing portfolio of
                specialist food and drink businesses, bringing together
                complementary brands, capabilities and expertise.
              </Lede>
              <p className="text-ink-soft">
                Established in 2014 through Slumberjack, the group has developed
                from its family-business roots into a broader platform serving
                customers across branded and private label markets.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              seed="clady-about-team"
              alt="The Clady Group team at work"
              aspect="aspect-[4/5]"
            />
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-16 max-w-2xl space-y-4 border-t border-cream-200 pt-10">
            <Lede>
              Today, our portfolio spans coffee, tea, hot chocolate, functional
              beverages, wellness products, soluble drinks and beverage
              ingredients.
            </Lede>
            <p className="text-ink-soft">
              Each business has its own identity and area of expertise. Together,
              they give our customers access to a broader range of products,
              capabilities and commercial opportunities.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-cream-200/40" pad="py-10 sm:py-14">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">At a glance</h2>
        </Reveal>
        <RevealStagger className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {STATS.map((s) => (
            <StatTile key={s.label} value={s.value} label={s.label} />
          ))}
        </RevealStagger>
        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-cream-200 pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
              Sectors we serve
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <li key={s}>
                  <Pill>{s}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 border-t border-cream-200 pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
              Accreditations across our portfolio
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ACCREDITATIONS.map((a) => (
                <li key={a}>
                  <Pill>{a}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <Pending>
              Still to confirm: team size (Build Plan, open question 01).
              Production capabilities and annual production volumes are only
              available for the coffee side of the business currently, so
              have been left out as a group-wide stat pending confirmation on
              the rest of the portfolio.
            </Pending>
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageFrame
              seed="clady-family-business-heritage"
              alt="Clady Group's family-business heritage"
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
              From family business <em className="italic text-gold-700">to group</em>
            </h2>
            <PullQuote className="mt-6">
              Our heritage as a family business remains central to how we operate.
            </PullQuote>
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>
                From the beginning, our focus has been on building lasting
                relationships and creating products that deliver for our customers.
                As the group has grown, we have retained that approach while
                developing a broader portfolio and greater capability across the
                food and drink sector.
              </p>
              <p>
                Our ambition is to continue growing a group of specialist brands
                that can respond to changing markets while maintaining the
                personal approach and commercial focus that have shaped our
                business from the outset.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <Reveal className="relative">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold text-cream-100 sm:text-3xl">
            How we work
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-cream-100/75">
            <p>
              We combine the scale and breadth of an ambitious and capable group
              with the responsiveness of a family business.
            </p>
            <p>
              Our customers operate in fast-moving markets, where quality,
              reliability and the ability to respond quickly matter. We take a
              practical, collaborative approach, working closely with customers
              and partners to understand their requirements, identify
              opportunities and deliver solutions that work commercially.
            </p>
            <p>
              We stay close to changing consumer tastes and market trends, while
              maintaining a consistent focus on quality and service.
            </p>
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center text-xl italic leading-snug text-gold-500 sm:text-2xl">
            The result is a business that is ambitious enough to grow, but
            agile enough to respond.
          </p>
        </Reveal>
      </Section>

      <Section pad="py-10 sm:py-14">
        <Reveal>
          <BrandGrid />
        </Reveal>
      </Section>
    </>
  );
}
