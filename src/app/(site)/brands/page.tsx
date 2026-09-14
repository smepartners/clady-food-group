import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Our Brands" };

const BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    strap: "Everyday wellness made easy.",
    focus: "Functional drinks · Supplements · Natural wellness · Performance",
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    strap: "Coffee with a taste of Galway.",
    focus: "Coffee · B2B · B2C · Irish heritage",
  },
  {
    slug: "dutch-maid",
    name: "Dutch Maid",
    strap: "Convenience made simple.",
    focus: "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Private label",
  },
  {
    slug: "slumberjack",
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Hot chocolate · B2B · B2C",
  },
];

export default function BrandsIndexPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
          A portfolio with a purpose
        </h1>
        <p className="mt-6 max-w-2xl text-ink-soft">
          Our brands operate across complementary areas of the food and drink
          market, each with a clear proposition and specialist focus.
        </p>
      </Section>

      <Section className="bg-cream-200/40">
        <div className="grid gap-6 sm:grid-cols-2">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="rounded-lg border border-cream-200 bg-cream-100 p-6 transition hover:border-green-500"
            >
              <h2 className="text-lg font-semibold text-green-700">{b.name}</h2>
              <p className="mt-1 text-sm italic text-ink-soft">{b.strap}</p>
              <p className="mt-3 text-xs text-ink-soft">{b.focus}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">
          Innovation at our core
        </h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            Innovation is central to how we think, create and grow. We
            continually explore new ingredients, formats, technologies and
            consumer trends to develop products that meet changing tastes and
            market demands.
          </p>
          <p>
            From refining established products to developing new concepts from
            the ground up, our teams combine insight, expertise and creativity
            to turn ideas into commercially successful products.
          </p>
        </div>
      </Section>
    </>
  );
}
