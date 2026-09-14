import Link from "next/link";
import {
  Sparkle,
  Lightbulb,
  CheckCircle,
  Lightning,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
  Section,
  Pending,
  ImageFrame,
  IconFeature,
  CTAButton,
  AccentRule,
} from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

const VALUES = [
  { icon: Sparkle, tone: "gold" as const, name: "Excellence", body: "High standards in everything we do, whether that's branded or white labelled." },
  { icon: Lightbulb, tone: "green" as const, name: "Innovation", body: "Looking ahead to what's next, keeping our customers ahead of the trends." },
  { icon: CheckCircle, tone: "olive" as const, name: "Consistency", body: "Reliable quality, flavours and product profiles, every time." },
  { icon: Lightning, tone: "gold" as const, name: "Agility", body: "The world and consumers move fast; that's why we respond quickly to changing needs." },
  {
    icon: UsersThree,
    tone: "green" as const,
    name: "Collaboration",
    // Two copy options exist in the source doc - see Build Plan §06, open question 03.
    body: "Building strong, lasting partnerships that grow with our customers.",
  },
];

const BRAND_TEASERS = [
  { slug: "evolving-state", name: "Evolving State", strap: "Everyday wellness made easy.", seed: "clady-evolving-state-wellness" },
  { slug: "galway-roast", name: "Galway Roast", strap: "Coffee with a taste of Galway.", seed: "clady-galway-roast-coffee" },
  { slug: "dutch-maid", name: "Dutch Maid", strap: "Convenience made simple.", seed: "clady-dutch-maid-soluble" },
  { slug: "slumberjack", name: "Slumberjack", strap: "Our signature beverage brand.", seed: "clady-slumberjack-coffee" },
];

export default function HomePage() {
  return (
    <>
      <Section pad="pt-14 sm:pt-16 pb-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
              Built around your business.
            </h1>
            <AccentRule className="mt-6" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Clady Group brings together a portfolio of specialist food, confectionery
              and beverage brands and capabilities, delivering quality, choice and
              flexibility to customers across B2B and B2C markets.
            </p>
            <div className="mt-8">
              <CTAButton href="/brands">Explore our brands</CTAButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              seed="clady-group-coffee-roastery"
              alt="Coffee roasting and beverage production at a Clady Group facility"
              aspect="aspect-[4/5] lg:aspect-square"
            />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-6 border-t border-cream-200 pt-16 sm:grid-cols-3">
            <p className="text-ink-soft">
              From freshly roasted coffee and indulgent hot beverages to functional
              wellness products and bespoke private label solutions, our businesses
              combine specialist knowledge with a practical understanding of what
              customers need.
            </p>
            <p className="text-ink-soft">
              We believe great partnerships are built on more than great products.
              They depend on consistency, responsiveness and the ability to move
              with a changing market.
            </p>
            <p className="text-ink-soft">
              That is why we work across categories, formats and price points,
              helping our customers create, source and grow beverage propositions
              that perform.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-green-700">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ImageFrame
              seed="clady-manufacturing-northern-ireland"
              alt="Manufacturing operations across England and Northern Ireland"
              aspect="aspect-[4/3]"
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
              One group. Multiple capabilities.
            </h2>
            <div className="mt-4 space-y-4 text-cream-100/75">
              <p>
                With manufacturing operations across England and Northern Ireland,
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
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">Our brands</h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_TEASERS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl transition duration-300 group-hover:-translate-y-1">
                <ImageFrame seed={b.seed} alt={b.name} aspect="aspect-[4/5]" />
              </div>
              <h3 className="mt-4 font-semibold text-ink transition group-hover:text-green-700">
                {b.name}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{b.strap}</p>
            </Link>
          ))}
        </RevealStagger>
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
        <div className="mt-10">
          <Pending>
            Collaboration copy has two options in the source doc - confirm which
            one ships (Build Plan, open question 03).
          </Pending>
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-green-700 px-8 py-14 text-center sm:px-16">
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
