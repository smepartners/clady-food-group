import type { Metadata } from "next";
import { CalendarBlank, Buildings, Package } from "@phosphor-icons/react/dist/ssr";
import { Section, ImageFrame, Pill, BrandGrid, PullQuote, TextureOverlay, FacilityStrip, StatTile } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AccreditationGrid, type Accreditation } from "@/components/accreditation";
import { AboutHero } from "@/components/about-hero";
import { ClientLogoBar } from "@/components/client-logo-bar";
import { VideoStorySection } from "@/components/video-story-section";
import { BRANDS } from "@/lib/brands";

export const metadata: Metadata = { title: "About Us" };

// Established 2014 (Slumberjack) - kept as a literal rather than computed
// from the current date, so the stat doesn't silently drift as years pass.
// Update by hand at the next content refresh. The "3 manufacturing sites"
// stat used to carry the Buxton/Belfast/Galway detail as its label text -
// split out into FacilityStrip below instead, so the three sites read as
// three distinct, named locations rather than a line of small print.
const STATS = [
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

const SECTORS = ["Retail", "Cafés", "Food service", "Hospitality"];

// Accreditations confirmed by the client (Zoe, SME Partners) - held across
// the portfolio rather than by any single brand, so presented as a
// group-wide list rather than attributed brand-by-brand pending further
// guidance on how the client wants that split shown. `note` is a plain,
// factual one-line description of what each scheme covers, not a claim
// about Clady beyond holding the accreditation itself.
//
// `logo` is each certifying body's mark. Rainforest Alliance, Fairtrade and
// SALSA below are placeholder artwork pulled from each body's own public
// site/Wikimedia, standing in until Clady/Zoe supply the licensed versions -
// swap the file once received. BRCGS has no logo here: BRCGS's own brand
// guidelines state their certificated-site logo is only issued on request,
// tied to the site's certificate number, so there is no generic public
// version to place - it renders as a text Pill via AccreditationGrid until
// BRCGS (or Zoe) supplies Clady's actual certificate-linked artwork.
const ACCREDITATIONS: Accreditation[] = [
  {
    name: "Rainforest Alliance",
    note: "Certified sustainable and responsible sourcing",
    logo: "/logo-rainforest-alliance.png",
  },
  {
    name: "Fairtrade",
    note: "Certified fair trading practices across our supply chain",
    logo: "/logo-fairtrade.png",
  },
  {
    name: "BRCGS Start Basic",
    note: "Independently audited food safety standard",
  },
  {
    name: "SALSA",
    note: "Safe and Local Supplier Approval accreditation",
    logo: "/logo-salsa.png",
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Full-bleed "impact" band right after the hero, same move the
          homepage made (see page.tsx there): the scale stats and the
          portfolio-breadth copy that used to live inside the boxed hero
          now sit here instead, paired with their own supporting
          photography, rather than crowding the hero itself. */}
      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ImageFrame
              seed="clady-about-manufacturing"
              alt="A roaster on Clady Group's production line"
              src="/photo-roastery-detail.jpg"
              aspect="aspect-[4/3]"
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
              Today, our portfolio spans <em className="italic text-gold-500">coffee to wellness.</em>
            </h2>
            <div className="mt-5 space-y-4 text-cream-100/75">
              <p>
                Established in 2014 through Slumberjack, the group has
                developed from its family-business roots into a broader
                platform serving customers across branded and private label
                markets.
              </p>
              <p>
                Our portfolio spans coffee, tea, hot chocolate, functional
                beverages, wellness products, soluble drinks and beverage
                ingredients. Each business has its own identity and area of
                expertise, giving our customers access to a broader range of
                products, capabilities and commercial opportunities.
              </p>
            </div>
            {/* Tone is hardcoded dark, not derived from the Simple/Bold
                toggle - this band's background is always green-700
                regardless of preview style, unlike a page hero. */}
            <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-8 border-t border-cream-100/15 pt-6">
              {STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} tone="dark" />
              ))}
            </div>
            <FacilityStrip tone="dark" className="mt-6 border-t border-cream-100/15 pt-6" />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-cream-200/40" pad="py-10 sm:py-14">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">At a glance</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 border-t border-cream-200 pt-8">
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
        <Reveal delay={0.1}>
          <div className="mt-8 border-t border-cream-200 pt-8">
            <AccreditationGrid items={ACCREDITATIONS} label="Accreditations across our portfolio" />
          </div>
        </Reveal>
      </Section>

      <VideoStorySection
        heading={
          <>
            Hear it <em className="italic text-gold-500">from us.</em>
          </>
        }
        body={
          <p>
            A short look at Clady Group, in the words of the people who run
            it - our roots as a family business, how the group has grown,
            and what we&apos;re building toward next.
          </p>
        }
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageFrame
              seed="clady-family-business-heritage"
              alt="Clady Group's family-business heritage"
              src="/photo-about-heritage.jpg"
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
        <ClientLogoBar />
      </Section>

      <Section pad="py-10 sm:py-14" className="bg-cream-200/40">
        <Reveal>
          <BrandGrid />
        </Reveal>
      </Section>
    </>
  );
}
