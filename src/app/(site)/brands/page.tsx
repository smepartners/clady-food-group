import type { Metadata } from "next";
import Link from "next/link";
import { Section, ImageFrame, AccentRule } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

export const metadata: Metadata = { title: "Our Brands" };

const BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    strap: "Everyday wellness made easy.",
    focus: "Functional drinks · Supplements · Natural wellness · Performance",
    seed: "clady-evolving-state-wellness",
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    strap: "Coffee with a taste of Galway.",
    focus: "Coffee · B2B · B2C · Irish heritage",
    seed: "clady-galway-roast-coffee",
  },
  {
    slug: "dutch-maid",
    name: "Dutch Maid",
    strap: "Convenience made simple.",
    focus: "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Private label",
    seed: "clady-dutch-maid-soluble",
  },
  {
    slug: "slumberjack",
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Hot chocolate · B2B · B2C",
    seed: "clady-slumberjack-coffee",
  },
];

export default function BrandsIndexPage() {
  return (
    <>
      <Section pad="pt-14 sm:pt-16 pb-20 sm:pb-28">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
            A portfolio with <em className="italic text-gold-700">a purpose</em>
          </h1>
          <AccentRule className="mt-7" />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Our brands operate across complementary areas of the food and drink
            market, each with a clear proposition and specialist focus.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-cream-200/40">
        <RevealStagger className="grid gap-10 sm:grid-cols-2">
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl transition duration-300 group-hover:-translate-y-1">
                <ImageFrame seed={b.seed} alt={b.name} aspect="aspect-[16/10]" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink transition group-hover:text-green-700">
                {b.name}
              </h2>
              <p className="mt-1 text-sm italic text-ink-soft">{b.strap}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-olive-600">{b.focus}</p>
            </Link>
          ))}
        </RevealStagger>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
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
        </Reveal>
      </Section>
    </>
  );
}
