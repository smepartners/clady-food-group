import Link from "next/link";
import { Section, Pending } from "@/components/ui";

const VALUES = [
  { name: "Excellence", body: "High standards in everything we do, whether that's branded or white labelled." },
  { name: "Innovation", body: "Looking ahead to what's next, keeping our customers ahead of the trends." },
  { name: "Consistency", body: "Reliable quality, flavours and product profiles, every time." },
  { name: "Agility", body: "The world and consumers move fast; that's why we respond quickly to changing needs." },
  {
    name: "Collaboration",
    // Two copy options exist in the source doc - see Build Plan §06, open question 03.
    body: "Building strong, lasting partnerships that grow with our customers.",
  },
];

const BRAND_TEASERS = [
  { slug: "evolving-state", name: "Evolving State", strap: "Everyday wellness made easy." },
  { slug: "galway-roast", name: "Galway Roast", strap: "Coffee with a taste of Galway." },
  { slug: "dutch-maid", name: "Dutch Maid", strap: "Convenience made simple." },
  { slug: "slumberjack", name: "Slumberjack", strap: "Our signature beverage brand." },
];

export default function HomePage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
          Built around your business.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
          <p>
            Clady Group brings together a portfolio of specialist food, confectionery
            and beverage brands and capabilities, delivering quality, choice and
            flexibility to customers across B2B and B2C markets.
          </p>
          <p>
            From freshly roasted coffee and indulgent hot beverages to functional
            wellness products and bespoke private label solutions, our businesses
            combine specialist knowledge with a practical understanding of what
            customers need.
          </p>
          <p>
            We believe great partnerships are built on more than great products.
            They depend on consistency, responsiveness and the ability to move
            with a changing market.
          </p>
          <p>
            That is why we work across categories, formats and price points,
            helping our customers create, source and grow beverage propositions
            that perform.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">
          One group. Multiple capabilities.
        </h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            With manufacturing operations across England and Northern Ireland,
            Clady Group brings together a broad portfolio of complementary
            expertise across branded beverages, wellness, soluble drinks and
            private label manufacturing.
          </p>
          <p>
            Our scale, capabilities and breadth of experience enable us to support
            customers at every stage, from established brands and high-volume
            production to tailored private label solutions and the development of
            new products from the ground up.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">Our brands</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {BRAND_TEASERS.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="rounded-lg border border-cream-200 p-6 transition hover:border-green-500"
            >
              <h3 className="font-semibold text-green-700">{b.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{b.strap}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/brands"
          className="mt-6 inline-block text-sm font-medium text-olive-600 hover:text-green-700"
        >
          Explore our brands &rarr;
        </Link>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">What drives us</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((v) => (
            <div key={v.name}>
              <h3 className="font-semibold text-ink">{v.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Pending>
            Collaboration copy has two options in the source doc - confirm which
            one ships (Build Plan, open question 03).
          </Pending>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">
          Built for better partnerships
        </h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            From established beverage brands to private label manufacturing, our
            businesses are designed to make working with us straightforward.
          </p>
          <p>
            We combine market knowledge, product expertise and a flexible
            approach to help customers respond to changing consumer expectations
            and commercial opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-md bg-green-700 px-5 py-2.5 text-sm font-medium text-cream-100 hover:bg-green-900"
        >
          Discover what Clady Group can do for your business
        </Link>
      </Section>
    </>
  );
}
