import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, ImageFrame } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BrandsHero } from "@/components/brands-hero";

export const metadata: Metadata = { title: "Our Brands" };

// `logo` is each brand's real supplied logo mark (Oct 2026) - see
// public/PHOTO-CREDITS.md and the matching comment on lib/brands.ts.
const BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    strap: "Everyday wellness made easy.",
    focus: "Functional drinks · Supplements · Natural wellness · Performance",
    seed: "clady-evolving-state-wellness",
    photo: "/photo-brand-evolving-state.jpg",
    logo: "/logo-evolving-state.png",
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    strap: "Coffee with a taste of Galway.",
    focus: "Coffee · B2B · B2C · Irish heritage",
    seed: "clady-galway-roast-coffee",
    photo: "/photo-brand-galway-roast.jpg",
    logo: "/logo-galway-roast.png",
  },
  {
    slug: "dutch-maid",
    name: "Dutch Maid",
    strap: "Convenience made simple.",
    focus: "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Private label",
    seed: "clady-dutch-maid-soluble",
    photo: "/photo-brand-dutch-maid.jpg",
    logo: "/logo-dutch-maid.png",
  },
  {
    slug: "slumberjack",
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Hot chocolate · B2B · B2C",
    seed: "clady-slumberjack-coffee",
    photo: "/photo-brand-slumberjack.jpg",
    logo: "/logo-slumberjack.svg",
  },
];

export default function BrandsIndexPage() {
  return (
    <>
      <BrandsHero />

      <Section className="bg-cream-200/40">
        <RevealStagger className="grid gap-10 sm:grid-cols-2">
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl transition duration-300 group-hover:-translate-y-1">
                <ImageFrame seed={b.seed} alt={b.name} src={b.photo} aspect="aspect-[16/10]" />
                <div className="absolute bottom-3 left-3 flex h-10 items-center rounded-md bg-cream-100/95 px-2.5 shadow-sm">
                  <Image src={b.logo} alt="" width={80} height={32} className="h-5 w-auto object-contain" />
                </div>
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
