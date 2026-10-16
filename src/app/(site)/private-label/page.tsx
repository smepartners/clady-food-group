import type { Metadata } from "next";
import {
  Package,
  ChartLineUp,
  Lightning,
  CheckCircle,
  UsersThree,
  CalendarBlank,
  Buildings,
  Coffee,
  Drop,
  TeaBag,
} from "@phosphor-icons/react/dist/ssr";
import { Section, Container, CTAButton, ImageFrame, TextureOverlay, StatTile, AccentRule } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { PrivateLabelHero } from "@/components/private-label-hero";

export const metadata: Metadata = { title: "Private Label" };

// Same confirmed scale facts as the homepage and About page (see STATS /
// HOME_STATS there) - led with here too, since a procurement contact
// evaluating Clady for a white label programme needs to see this is a
// group with real manufacturing scale before reading about the approach.
// Round 5 feedback: the brand-count stat ("4 specialist brands") undersold
// the private label side of the business, since 4 is the group's own
// owned-brand count, not how many customer brands/SKUs are produced under
// private label - swapped for "100s" to make that distinction clear.
const SCALE_STATS = [
  { value: "12+", label: "Years established, since 2014", icon: <CalendarBlank size={20} weight="bold" /> },
  {
    value: "3",
    label: "Manufacturing sites across the UK & Ireland",
    icon: <Buildings size={20} weight="bold" />,
  },
  {
    value: "100s",
    label: "Specialist and private label brands produced",
    icon: <Package size={20} weight="bold" />,
  },
];

// Round 5 feedback: "please start with Coffee / Powdered drinks /
// Functional drinks / Tea" - photography exists for three of the four
// (reusing the closest real brand photography for each category rather
// than generic stock), Tea gets the standard "photography pending"
// placeholder until a dedicated shot is supplied.
const PRODUCE_CATEGORIES = [
  { name: "Coffee", icon: Coffee, seed: "clady-produce-coffee", photo: "/photo-brand-galway-roast.jpg" },
  { name: "Powdered drinks", icon: Drop, seed: "clady-produce-powdered", photo: "/photo-brand-dutch-maid.jpg" },
  { name: "Functional drinks", icon: Lightning, seed: "clady-produce-functional", photo: "/photo-brand-evolving-state.jpg" },
  { name: "Tea", icon: TeaBag, seed: "clady-produce-tea" },
];

const PILLARS = [
  { icon: Package, tone: "gold" as const, name: "Product expertise", body: "Knowledge across a broad range of beverage categories and formats." },
  { icon: ChartLineUp, tone: "green" as const, name: "Market awareness", body: "An understanding of changing consumer tastes and emerging beverage trends." },
  { icon: Lightning, tone: "olive" as const, name: "Flexibility", body: "Solutions developed around different customer requirements, channels and price points." },
  { icon: CheckCircle, tone: "gold" as const, name: "Consistency", body: "A focus on dependable product quality and reliable customer relationships." },
  { icon: UsersThree, tone: "green" as const, name: "Collaboration", body: "A partnership approach from initial brief through to finished product." },
];

// Matches ValuesDarkBand's icon treatment (values-section.tsx) - a ring
// rather than a filled disc, cream text for green/olive since both read
// the same against a dark background there too.
const PILLAR_ICON_TONE = {
  gold: "bg-gold-500/20 text-gold-500 ring-gold-500/30",
  green: "bg-cream-100/10 text-cream-100 ring-cream-100/15",
  olive: "bg-cream-100/10 text-cream-100 ring-cream-100/15",
} as const;

export default function PrivateLabelPage() {
  return (
    <>
      <PrivateLabelHero />

      {/* Same move as Home/About: the scale stats and the "more than a
          logo" positioning that used to sit inside the boxed hero now get
          their own full-width band with supporting photography, matching
          how ABF/P&G/Unilever pair a scale statement with its own section
          rather than crowding the hero. */}
      {/* Round 8 feedback: "can the section colours be checked here
          there's lots of green by each other" - the hero immediately
          above this is a full-bleed photo under a heavy green-900
          gradient wash (page-hero.tsx), so a green-700 band straight
          after it read as two green sections back to back. Flipped to
          light (same move About's portfolio section made for the same
          reason - see that page's comment), so the dark hero gets actual
          contrast beneath it instead of more green. */}
      <Section className="relative overflow-hidden bg-cream-200/40">
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            {/* Round 7 feedback: "update more than a logo photo to the
                large one below this section" - swapped for the
                production-packing-line photo that used to sit in the
                "What we produce" band below, rather than the roastery
                detail shot.
                Round 8 feedback: "photo in the more than a logo section
                still not updated - can be this one" plus a specific
                Google Drive photo - George wanted a different shot than
                the packing line: a closer, higher-resolution view of the
                roasters themselves. Downloaded from the supplied Drive
                link and added as photo-roastery-row.jpg. */}
            <ImageFrame
              seed="clady-private-label-roastery-row"
              alt="A row of roasters at Clady Group's production facility"
              src="/photo-roastery-row.jpg"
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
              More than <em className="italic text-gold-700">a logo on a product.</em>
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft">
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
            <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-8 border-t border-cream-200 pt-6">
              {SCALE_STATS.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} icon={s.icon} />
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
        </Reveal>

        {/* Round 5 feedback: a list of what's actually produced, each with
            its own small photo - "The brands we produce for" grid that
            used to sit here has been removed, and a "get in touch" CTA
            takes its place.
            Round 7 feedback: "remove the large picture in what we produce
            and just have the 4 blocks" - the production-packing-line
            photo that used to sit above this grid has been removed (it
            now lives in the "More than a logo" band above instead, see
            that section's comment), leaving just the 4 category blocks. */}
        <RevealStagger className="mt-6 grid gap-8 border-t border-cream-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCE_CATEGORIES.map((c) => (
            <div key={c.name}>
              <ImageFrame
                seed={c.seed}
                alt={c.photo ? `${c.name} produced by Clady Group` : `${c.name} - photography pending`}
                src={c.photo}
                aspect="aspect-[4/3]"
              />
              <div className="mt-3 flex items-center gap-2">
                <c.icon size={18} weight="bold" className="text-green-700" />
                <h3 className="font-semibold text-ink">{c.name}</h3>
              </div>
            </div>
          ))}
        </RevealStagger>

        <Reveal className="mt-14 text-center">
          <CTAButton href="/contact">Get in touch about private label</CTAButton>
        </Reveal>
      </Section>

      {/* Round 5 feedback: "A flexible approach and onwards not matching
          the style of the homepage" - this was a flat bg-green-700 block
          with no texture or CTA; now matches the homepage's closing
          "Built for better partnerships" band (home/page.tsx) exactly:
          texture overlay, soft corner glows, inverted CTA button. */}
      <section className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
        <TextureOverlay />
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
        <Reveal className="relative">
          <Container>
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
              A flexible approach
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">
              We work collaboratively with customers to understand the
              opportunity and develop solutions around their needs. Whether
              you are looking to launch a new proposition, extend an
              existing range or source a proven product under your own
              brand, our capabilities can support you.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" tone="inverted">
                Talk to us about your opportunity
              </CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>

      {/* Round 5 feedback: "idea to opportunity can show the same as on
          the homepage" - was a 5-up IconFeature card grid with numbered
          badges (the pre-round-4 pattern already dropped everywhere
          else); now the same dark, full-bleed divide-y band as the
          homepage's "What drives us" (values-section.tsx ValuesDarkBand),
          down to the corner glows and ring icon treatment. */}
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-olive-400/10 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500/90">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-cream-100 sm:text-4xl">
              From idea to opportunity
            </h2>
            <AccentRule className="mt-6" />
          </Reveal>
          <RevealStagger className="mt-14 divide-y divide-cream-100/10 border-t border-cream-100/10">
            {PILLARS.map((p) => (
              <div
                key={p.name}
                className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
              >
                <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition duration-300 group-hover:scale-105 ${PILLAR_ICON_TONE[p.tone]}`}
                  >
                    <p.icon size={22} weight="bold" />
                  </span>
                  <h3 className="text-xl font-semibold text-cream-100 sm:text-2xl">{p.name}</h3>
                </div>
                <p className="max-w-xl text-cream-100/70 sm:text-lg">{p.body}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </Section>

      {/* Round 6 feedback: "Across multiple markets", "Who we work with"
          and "What customers say" all removed - the client-logo and
          testimonial content in those last two was placeholder (fictional
          names/quotes) rather than confirmed, permitted real customers, so
          they've come out rather than stay as unlabelled placeholder
          content on a live page.
          Round 7 feedback: "CTA under from idea to opportunity block is
          floating / has a ton of white space around it - remove cream
          section with it in?" - that closing CTA Section sat alone on the
          plain page background right after the dark "From idea to
          opportunity" band, with nothing else in it. Removed outright:
          the page now ends on that band, and "A flexible approach"
          higher up already carries its own get-in-touch CTA. */}
    </>
  );
}
