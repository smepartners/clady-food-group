import type { Metadata } from "next";
import { FilmSlate, Storefront, Coffee, ForkKnife, Bed } from "@phosphor-icons/react/dist/ssr";
import { Section, Container, CTAButton, TextureOverlay, AccentRule } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AccreditationGrid, type Accreditation } from "@/components/accreditation";
import { AboutHero } from "@/components/about-hero";
import { VideoStorySection } from "@/components/video-story-section";
import { GroupInstagramHighlight } from "@/components/instagram-feed";

export const metadata: Metadata = { title: "About Us" };

// Round 5 feedback: each sector now carries its own icon rather than
// rendering as a plain text Pill - "can this be more visual?"
const SECTORS = [
  { name: "Retail", icon: Storefront },
  { name: "Cafés", icon: Coffee },
  { name: "Food service", icon: ForkKnife },
  { name: "Hospitality", icon: Bed },
];

// Accreditations confirmed by the client (Zoe, SME Partners) - held across
// the portfolio rather than by any single brand, so presented as a
// group-wide list rather than attributed brand-by-brand pending further
// guidance on how the client wants that split shown. `note` is a plain,
// factual one-line description of what each scheme covers, not a claim
// about Clady beyond holding the accreditation itself.
//
// Round 5 feedback: BRCGS and SALSA removed for now - Zoe wants sign-off
// from the team before either goes back up, rather than risk forgetting to
// add them once approved. Left here as a comment so they're easy to
// reinstate:
//   { name: "BRCGS Start Basic", note: "Independently audited food safety standard" },
//   { name: "SALSA", note: "Safe and Local Supplier Approval accreditation", logo: "/logo-salsa.png" },
//
// `logo` is each certifying body's mark. Rainforest Alliance and Fairtrade
// below are placeholder artwork pulled from each body's own public
// site/Wikimedia, standing in until Clady/Zoe supply the licensed versions -
// swap the file once received.
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
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Round 5 feedback: "update this to use graphic from home page /
          remove need for separate stats etc" - the stat row and facility
          strip that used to sit here are gone, replaced with the same
          holding-placeholder graphic treatment as the homepage's "One
          group, multiple capabilities" band, ready to take the same
          supplied clip (or an About-specific one) once it exists. */}
      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <div className="relative grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 flex flex-col justify-center lg:order-1">
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
            <div className="mt-8">
              <CTAButton href="/contact" tone="inverted">
                Get in touch
              </CTAButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative flex aspect-[4/5] min-h-[22rem] items-center justify-center overflow-hidden bg-green-900 lg:aspect-auto lg:h-full">
              <TextureOverlay texture="/texture-leather-green.jpg" />
              <div className="relative flex flex-col items-center gap-3 px-6 text-center text-cream-100/70">
                <FilmSlate size={32} weight="bold" />
                <p className="text-sm font-medium">
                  Graphic clip to come - holding placeholder
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Round 5 feedback: "remove image / make this a full width section
          and move higher up the page" - was an image + text split further
          down the page; now a full-width band right after the portfolio
          band, matching the weight of the other full-bleed moments on the
          site rather than a smaller contained split. */}
      <Section className="relative overflow-hidden bg-cream-200/40">
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            From family business <em className="italic text-gold-700">to group</em>
          </h2>
          <p className="mt-6 text-xl italic leading-snug text-green-700 sm:text-2xl">
            Our heritage as a family business remains central to how we operate.
          </p>
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
      </Section>

      {/* Round 5 feedback: "higher up the page please". */}
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

      {/* Round 5 feedback: "would this be better higher up the page?" -
          moved up from the bottom of the page to follow straight on from
          the group narrative above. */}
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

      {/* Round 5 feedback: "can this be more visual? so each has a graphic
          icon?" - sectors now render as icon cards instead of text pills.
          Accreditations below unchanged in treatment, just BRCGS/SALSA
          removed for now (see ACCREDITATIONS comment above). */}
      <Section className="bg-cream-200/40" pad="py-10 sm:py-14">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">At a glance</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 border-t border-cream-200 pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
              Sectors we serve
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {SECTORS.map((s) => (
                <li key={s.name} className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700/10 text-green-700">
                    <s.icon size={24} weight="bold" />
                  </span>
                  <span className="text-sm font-semibold text-ink">{s.name}</span>
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

      {/* Round 5 feedback: "Who we work with" (client logo bar) and "Part
          of the Clady Food Group" (brand grid) sections removed for now -
          to go back in once client names are approved to show and once
          this page needs another brand-portfolio mention. */}

      <Section pad="py-10 sm:py-14">
        <GroupInstagramHighlight />
      </Section>

      {/* Closes on a get-in-touch CTA. */}
      <section className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
        <TextureOverlay />
        <Reveal className="relative">
          <Container>
            <AccentRule className="mx-auto" />
            <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
              Want to know more about Clady Group?
            </h2>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" tone="inverted">
                Get in touch
              </CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
