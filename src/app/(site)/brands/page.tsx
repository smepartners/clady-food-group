import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package } from "@phosphor-icons/react/dist/ssr";
import { Section, ImageFrame, TextureOverlay } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BrandsHero } from "@/components/brands-hero";

export const metadata: Metadata = { title: "Our Brands" };

// `logo` is each brand's real supplied logo mark (Oct 2026) - see
// public/PHOTO-CREDITS.md and the matching comment on lib/brands.ts.
// Round 5 feedback: ordered Slumberjack, Dutch Maid, Evolving State, Galway
// Roast, Private Label (priority order supplied by Zoe); B2B/B2C tags
// dropped from every focus line, and a "Private label" tag added to every
// brand except Evolving State (the one brand that isn't produced under
// private label too).
const BRANDS = [
  {
    slug: "slumberjack",
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Hot chocolate · Private label",
    seed: "clady-slumberjack-coffee",
    photo: "/photo-brand-slumberjack.jpg",
    logo: "/logo-slumberjack.svg",
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
    focus: "Coffee · Irish heritage · Private label",
    seed: "clady-galway-roast-coffee",
    photo: "/photo-brand-galway-roast.jpg",
    logo: "/logo-galway-roast.png",
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
              <div className="relative overflow-hidden transition duration-300 group-hover:-translate-y-1">
                <ImageFrame seed={b.seed} alt={b.name} src={b.photo} aspect="aspect-[16/10]" />
                {/* Bigger badge + bigger logo than before - client feedback
                    was the logos were tricky to see against the photo. */}
                <div className="absolute bottom-3 left-3 flex h-14 items-center rounded-md bg-cream-100/95 px-3.5 shadow-sm">
                  <Image src={b.logo} alt="" width={120} height={48} className="h-9 w-auto object-contain" />
                </div>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink transition group-hover:text-green-700">
                {b.name}
              </h2>
              <p className="mt-1 text-sm italic text-ink-soft">{b.strap}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-olive-600">{b.focus}</p>
            </Link>
          ))}

          {/* Fifth tile for Private Label, matching the homepage brand
              carousel's treatment of it as an equally-prominent fifth card
              rather than a footnote. */}
          <Link href="/private-label" className="group block">
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-green-900 transition duration-300 group-hover:-translate-y-1">
              <TextureOverlay texture="/texture-leather-green.jpg" />
              <Package size={40} weight="bold" className="relative text-gold-500" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink transition group-hover:text-green-700">
              Private Label
            </h2>
            <p className="mt-1 text-sm italic text-ink-soft">Manufactured under your own brand.</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-olive-600">
              Coffee · Tea · Soluble drinks · Wellness
            </p>
          </Link>
        </RevealStagger>
      </Section>

      {/* Round 5 feedback: was a plain text block on the cream background -
          given a photo/texture band of its own with centred text, matching
          the weight of the other full-width moments on the site (Private
          Label's "A flexible approach", the homepage's brand carousel). */}
      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
            Innovation at our core
          </h2>
          <div className="mt-4 space-y-4 text-cream-100/80">
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
