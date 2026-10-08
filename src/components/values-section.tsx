"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion, useInView } from "motion/react";
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
 * Four built concepts for the "What drives us" values band, switchable live
 * via the same fixed-pill pattern as `HeroSwitcher` - built after client
 * feedback that the original five-equal-card grid (small, white-on-cream)
 * felt disconnected from the bolder full-bleed moments around it elsewhere
 * on the page, and didn't give the values section enough presence.
 *
 * Each value is paired with a real clip or photo already cut for the hero
 * masonry grid (see home-hero.tsx / public/PHOTO-CREDITS.md) rather than
 * new imagery, picked for a loose thematic fit: robotic-arm (precision) for
 * Excellence, roasting-beans (the product taking shape) for Innovation,
 * casepacking (the same motion repeating) for Consistency, site-aerial
 * (the whole operation at once) for Agility, roastery-floor (people and
 * process together) for Collaboration.
 */
type ValueItem = {
  icon: typeof Sparkle;
  tone: "gold" | "green" | "olive";
  name: string;
  body: string;
  media: { type: "video"; webm: string; mp4: string; poster: string } | { type: "image"; src: string };
};

const VALUES: ValueItem[] = [
  {
    icon: Sparkle,
    tone: "gold",
    name: "Excellence",
    body: "High standards in everything we do, whether that's branded or white labelled.",
    media: {
      type: "video",
      webm: "/clip-robotic-arm.webm",
      mp4: "/clip-robotic-arm.mp4",
      poster: "/photo-video-still-robotic-arm.jpg",
    },
  },
  {
    icon: Lightbulb,
    tone: "green",
    name: "Innovation",
    body: "Looking ahead to what's next, keeping our customers ahead of the trends.",
    media: {
      type: "video",
      webm: "/clip-roasting-beans.webm",
      mp4: "/clip-roasting-beans.mp4",
      poster: "/photo-video-still-roasting-beans.jpg",
    },
  },
  {
    icon: CheckCircle,
    tone: "olive",
    name: "Consistency",
    body: "Reliable quality, flavours and product profiles, every time.",
    media: {
      type: "video",
      webm: "/clip-casepacking.webm",
      mp4: "/clip-casepacking.mp4",
      poster: "/photo-video-still-casepacking.jpg",
    },
  },
  {
    icon: Lightning,
    tone: "gold",
    name: "Agility",
    body: "The world and consumers move fast; that's why we respond quickly to changing needs.",
    media: {
      type: "video",
      webm: "/clip-site-aerial.webm",
      mp4: "/clip-site-aerial.mp4",
      poster: "/photo-site-aerial.jpg",
    },
  },
  {
    icon: UsersThree,
    tone: "green",
    name: "Collaboration",
    body: "Building strong, lasting partnerships that grow with our customers.",
    media: { type: "image", src: "/photo-roastery-floor.jpg" },
  },
];

const ICON_TONE = {
  gold: "bg-gold-500/15 text-gold-700",
  green: "bg-green-700/10 text-green-700",
  olive: "bg-olive-600/10 text-olive-600",
} as const;

const ICON_TONE_DARK = {
  gold: "bg-gold-500/20 text-gold-500",
  green: "bg-cream-100/10 text-cream-100",
  olive: "bg-cream-100/10 text-cream-100",
} as const;

function ValueMedia({
  item,
  className = "",
  priority = false,
}: {
  item: ValueItem;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  if (item.media.type === "video" && !reduce) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={item.media.poster}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      >
        <source src={item.media.webm} type="video/webm" />
        <source src={item.media.mp4} type="video/mp4" />
      </video>
    );
  }
  const src = item.media.type === "video" ? item.media.poster : item.media.src;
  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}

/** Concept 1 - full-bleed dark band, oversized editorial type instead of
 * cards. Matches the hero/brand carousel's own green-900 + TextureOverlay
 * treatment, so the section reads as a sibling of those rather than a
 * lighter aside between them. */
function ValuesDarkBand() {
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
        <RevealStagger className="mt-14 divide-y divide-cream-100/10 border-t border-cream-100/10">
          {VALUES.map((v, i) => (
            <div
              key={v.name}
              className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
            >
              <span className="text-2xl font-semibold tabular-nums text-gold-500/40 sm:w-20 sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
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

/** Concept 2 - one value, one real clip/photo per row, alternating sides -
 * the closest to how a large FMCG corporate site (Unilever/P&G-style)
 * actually presents values: paired with real operational footage instead
 * of an abstract icon, each row given a full, generous moment rather than
 * sharing a row with four others. */
function ValuesImageSequence() {
  return (
    <Section className="bg-cream-200/40">
      <Reveal className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-olive-600">Our values</p>
        <h2 className="mt-3 text-3xl font-semibold text-green-700 sm:text-4xl">What drives us</h2>
        <AccentRule className="mt-6" />
      </Reveal>
      <div className="mt-14 space-y-16 sm:space-y-20">
        {VALUES.map((v, i) => (
          <Reveal key={v.name}>
            <div
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg shadow-green-900/10 sm:rounded-3xl">
                <ValueMedia item={v} />
              </div>
              <div>
                <span className="text-sm font-semibold tabular-nums text-ink-soft/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 flex items-center gap-4">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ICON_TONE[v.tone]}`}>
                    <v.icon size={20} weight="bold" />
                  </span>
                  <h3 className="text-2xl font-semibold text-ink sm:text-3xl">{v.name}</h3>
                </div>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Concept 3 - one lead value given a full image/video treatment, the other
 * four kept as smaller supporting cards - hierarchy instead of five
 * identical boxes, without the bigger rebuild of concept 2. Consistency
 * leads, since "reliable, every time" pairs naturally with the repeating
 * case-packing motion. */
function ValuesLeadFeature() {
  const lead = VALUES.find((v) => v.name === "Consistency")!;
  const rest = VALUES.filter((v) => v.name !== "Consistency");
  return (
    <Section className="bg-cream-200/40">
      <Reveal className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-olive-600">Our values</p>
        <h2 className="mt-3 text-3xl font-semibold text-green-700 sm:text-4xl">What drives us</h2>
        <AccentRule className="mt-6" />
      </Reveal>
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-green-900/15 sm:aspect-auto sm:h-full sm:min-h-[26rem] sm:rounded-3xl">
            <ValueMedia item={lead} />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/85 via-green-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${ICON_TONE_DARK[lead.tone]}`}
              >
                <lead.icon size={22} weight="bold" />
              </span>
              <h3 className="mt-4 text-3xl font-semibold text-cream-100 sm:text-4xl">{lead.name}</h3>
              <p className="mt-3 max-w-sm text-cream-100/85 sm:text-lg">{lead.body}</p>
            </div>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:col-span-5">
          {rest.map((v) => (
            <div
              key={v.name}
              className="group flex flex-col gap-4 rounded-2xl border border-cream-200 bg-cream-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lg hover:shadow-green-900/5"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ICON_TONE[v.tone]}`}>
                <v.icon size={20} weight="bold" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </Section>
  );
}

/** Concept 4 - a sticky index of numbers tracking which value is in view
 * alongside large, generously spaced content blocks - the editorial
 * sticky-TOC pattern, giving each value its own full scroll moment rather
 * than all five competing for attention at once. Tracks the active value
 * with `useInView` per row rather than a hand-rolled scroll listener. */
function ValueRow({
  item,
  index,
  onActive,
}: {
  item: ValueItem;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="grid gap-6 py-12 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-16">
      <div className="relative h-44 w-full overflow-hidden rounded-2xl sm:h-full sm:w-56">
        <ValueMedia item={item} />
      </div>
      <div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ICON_TONE[item.tone]}`}>
          <item.icon size={20} weight="bold" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-green-700 sm:text-3xl">{item.name}</h3>
        <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink-soft">{item.body}</p>
      </div>
    </div>
  );
}

function ValuesStickyScroll() {
  const [active, setActive] = useState(0);
  return (
    <Section className="bg-cream-200/40">
      <Reveal className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-olive-600">Our values</p>
        <h2 className="mt-3 text-3xl font-semibold text-green-700 sm:text-4xl">What drives us</h2>
        <AccentRule className="mt-6" />
      </Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <div className="hidden lg:block">
          <ul className="sticky top-32 space-y-5">
            {VALUES.map((v, i) => (
              <li
                key={v.name}
                className={`transition duration-300 ${
                  i === active ? "text-green-700" : "text-ink-soft/35"
                }`}
              >
                <span className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className={`text-lg font-semibold transition ${i === active ? "translate-x-1" : ""}`}>
                  {v.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="divide-y divide-cream-200">
          {VALUES.map((v, i) => (
            <ValueRow key={v.name} item={v} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </Section>
  );
}

const CONCEPTS = [
  { key: "band", label: "Dark band", render: ValuesDarkBand },
  { key: "sequence", label: "Sequence", render: ValuesImageSequence },
  { key: "lead", label: "Lead + grid", render: ValuesLeadFeature },
  { key: "sticky", label: "Sticky index", render: ValuesStickyScroll },
] as const;

/**
 * Switches the "What drives us" values band between the four concepts above
 * so the client can compare them live, same pattern as `HeroSwitcher`. Kept
 * as a separate switcher component (rather than merging into one) so each
 * concept stays a plain, readable section on its own.
 */
export function ValuesSwitcher() {
  const [active, setActive] = useState<(typeof CONCEPTS)[number]["key"]>("band");
  const Active = CONCEPTS.find((c) => c.key === active)!.render;

  return (
    <div className="relative">
      <Active />
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-1 rounded-full border border-cream-100/20 bg-ink/95 p-1 text-sm text-cream-100 shadow-xl shadow-ink/30 backdrop-blur">
        <span className="pl-3 pr-1 text-xs font-medium uppercase tracking-wide text-cream-100/50">Values</span>
        {CONCEPTS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              active === c.key ? "bg-gold-500 text-ink" : "text-cream-100/70 hover:text-cream-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
