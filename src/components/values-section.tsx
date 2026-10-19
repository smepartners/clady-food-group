import {
  Sparkle,
  Lightbulb,
  CheckCircle,
  Lightning,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Section, TextureOverlay, AccentRule } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

/**
 * The "What drives us" values band. Four concepts were built and compared
 * live on the homepage via a review-only switcher pill (same pattern as
 * `HeroSwitcher`) after client feedback that the original five-equal-card
 * grid (small, white-on-cream) felt disconnected from the bolder full-bleed
 * moments around it elsewhere on the page. George (Oct 2026) confirmed the
 * dark band as the pick and asked for the switcher removed, so the other
 * three concepts (image sequence, lead + grid, sticky index) and the
 * switcher itself have come out - this is the one that ships.
 *
 * The media pairing (icon-only here, but kept in the component history
 * above for context) used real clips/photos already cut for the hero
 * masonry grid - that whole concept set lived in this file and is gone with
 * the others; see PHOTO-CREDITS.md for the original asset sourcing if this
 * ever needs resurrecting.
 */
type ValueItem = {
  icon: typeof Sparkle;
  tone: "gold" | "green" | "olive";
  name: string;
  body: string;
};

const VALUES: ValueItem[] = [
  {
    icon: Sparkle,
    tone: "gold",
    name: "Excellence",
    body: "High standards in everything we do, whether that's branded or white labelled.",
  },
  {
    icon: Lightbulb,
    tone: "green",
    name: "Innovation",
    body: "Looking ahead to what's next, keeping our customers ahead of the trends.",
  },
  {
    icon: CheckCircle,
    tone: "olive",
    name: "Consistency",
    body: "Reliable quality, flavours and product profiles, every time.",
  },
  {
    icon: Lightning,
    tone: "gold",
    name: "Agility",
    body: "The world and consumers move fast; that's why we respond quickly to changing needs.",
  },
  {
    icon: UsersThree,
    tone: "green",
    name: "Collaboration",
    body: "Building strong, lasting partnerships that grow with our customers.",
  },
];

const ICON_TONE_DARK = {
  gold: "bg-gold-500/20 text-gold-500",
  green: "bg-cream-100/10 text-cream-100",
  olive: "bg-cream-100/10 text-cream-100",
} as const;

/** Full-bleed dark band, oversized editorial type instead of cards. Matches
 * the hero/brand carousel's own green-900 + TextureOverlay treatment, so the
 * section reads as a sibling of those rather than a lighter aside between
 * them. */
export function ValuesDarkBand() {
  return (
    <Section className="relative overflow-hidden bg-green-900">
      <TextureOverlay />
      {/* Soft background glows, same device as the closing CTA band - gives
          the section some depth behind the list instead of flat colour,
          per client feedback that it felt blocky. */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <div
        className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-olive-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500/90">Our values</p>
          <h2 className="mt-3 text-3xl font-semibold text-cream-100 sm:text-4xl">What drives us</h2>
          <AccentRule className="mt-6" />
        </Reveal>
        {/* Numbered index removed per client feedback - this is a list of
            values, not a sequence of steps, so the numbering implied an
            order that wasn't intended. */}
        <RevealStagger className="mt-14 divide-y divide-cream-100/10 border-t border-cream-100/10">
          {VALUES.map((v) => (
            <div
              key={v.name}
              className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
            >
              <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                {/* Circular, matching the brand badges elsewhere on the
                    page, rather than the square icon tiles used before -
                    a ring rather than a filled disc so it reads as an
                    outline mark, not another solid block. */}
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition duration-300 group-hover:scale-105 ${ICON_TONE_DARK[v.tone]} ${
                    v.tone === "gold" ? "ring-gold-500/30" : "ring-cream-100/15"
                  }`}
                >
                  <v.icon size={22} weight="bold" />
                </span>
                <h3 className="text-xl font-semibold text-cream-100 sm:text-2xl">{v.name}</h3>
              </div>
              <p className="max-w-xl text-cream-100/70 sm:text-lg">{v.body}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </Section>
  );
}
