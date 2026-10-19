import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, ImageFrame, TextureOverlay } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BrandsHero } from "@/components/brands-hero";

export const metadata: Metadata = { title: "Our Brands" };

// `logo` is each brand's real supplied logo mark (Oct 2026) - see
// public/PHOTO-CREDITS.md and the matching comment on lib/brands.ts.
// Round 5 feedback: ordered Slumberjack, Dutch Maid, Evolving State,
// Private Label (priority order supplied by Zoe); B2B/B2C tags dropped
// from every focus line, and a "Private label" tag added to every brand
// except Evolving State (the one brand that isn't produced under private
// label too).
// Galway Roast removed from the group portfolio (George, Oct 2026) - see
// the matching comment on lib/brands.ts.
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
];

/** Private Label rendered as a sixth tile in the same list (see the note
 * on TILES below for why it has to be IN the array, not a sibling JSX
 * element after `{BRANDS.map(...)}`). */
const PRIVATE_LABEL_TILE = {
  slug: "private-label" as const,
  name: "Private Label",
  strap: "Manufactured under your own brand.",
  focus: "Coffee · Tea · Soluble drinks · Wellness",
};

// RevealStagger (reveal.tsx) calls `children.map(...)` on whatever is
// passed as its JSX children. `{BRANDS.map(x => <Link/>)}` followed by a
// sibling `<Link>` for Private Label used to hand it exactly TWO
// top-level children - the whole mapped array as one, plus the Private
// Label link as the other - so the CSS grid below only ever saw two grid
// items (one of them silently containing all four brand cards stacked
// inside a single cell). That's what Zoe was seeing as an "uneven grid".
// Building one flat array up front and mapping it once avoids that trap.
const TILES = [...BRANDS, PRIVATE_LABEL_TILE];

export default function BrandsIndexPage() {
  return (
    <>
      <BrandsHero />

      {/* Round 5 feedback: "Our brands has uneven grid and could do with
          CTA on each brand and private label" - a 2-up grid left the 5th
          (Private Label) tile stranded alone with empty space beside it;
          3-up at the lg breakpoint reads as a deliberate 3+2 layout
          instead. Every card now ends in an "Explore" link with the same
          arrow treatment as the homepage's brand carousel, rather than
          relying on the whole card being a silent click target. */}
      <Section className="bg-cream-200/40">
        <RevealStagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => {
            const isPrivateLabel = t.slug === "private-label";
            return (
              <Link
                key={t.slug}
                href={isPrivateLabel ? "/private-label" : `/brands/${t.slug}`}
                // Round 7 feedback: "Explore Slumberjack" sat higher than
                // the other cards' CTAs - each card's strap/focus text
                // wraps to a different number of lines, so the CTA that
                // used to follow straight after it landed at a different
                // height per card even within the same grid row. flex-col
                // + mt-auto on the CTA below pins it to the same baseline
                // across every card in a row instead.
                className="group flex h-full flex-col"
              >
                {isPrivateLabel ? (
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-green-900 transition duration-300 group-hover:-translate-y-1">
                    <TextureOverlay texture="/texture-leather-green.jpg" />
                    <Package size={40} weight="bold" className="relative text-gold-500" />
                  </div>
                ) : (
                  <div className="relative overflow-hidden transition duration-300 group-hover:-translate-y-1">
                    <ImageFrame
                      seed={(t as (typeof BRANDS)[number]).seed}
                      alt={t.name}
                      src={(t as (typeof BRANDS)[number]).photo}
                      aspect="aspect-[16/10]"
                    />
                    {/* Bigger badge + bigger logo than before - client
                        feedback was the logos were tricky to see against
                        the photo. */}
                    <div className="absolute bottom-3 left-3 flex h-14 items-center rounded-md bg-cream-100/95 px-3.5 shadow-sm">
                      <Image
                        src={(t as (typeof BRANDS)[number]).logo}
                        alt=""
                        width={120}
                        height={48}
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <h2 className="mt-4 text-lg font-semibold text-ink transition group-hover:text-green-700">
                    {t.name}
                  </h2>
                  <p className="mt-1 text-sm italic text-ink-soft">{t.strap}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-olive-600">{t.focus}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-green-700">
                    Explore {t.name}
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="shrink-0 text-gold-700 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
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
