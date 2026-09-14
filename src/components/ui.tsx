import type { ReactNode } from "react";
import Link from "next/link";
import { Camera } from "@phosphor-icons/react/dist/ssr";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>;
}

export function Section({
  children,
  className = "",
  pad = "py-14 sm:py-20",
}: {
  children: ReactNode;
  className?: string;
  // Full padding utility string - replaces the default rather than merging
  // with it, since layering py- and pt-/pb- overrides in one class list
  // has no reliable winner in Tailwind's generated cascade. Kept deliberately
  // tight: two adjacent sections both carrying this default stack their
  // padding at the shared boundary, so a generous per-side value balloons
  // into an oversized gap between sections very fast.
  pad?: string;
}) {
  return (
    <section className={`relative ${pad} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Flags a spot where copy is still an open question - see Build Plan §06. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-gold-500 bg-gold-500/10 px-5 py-4 text-sm text-ink-soft">
      <span className="font-semibold text-gold-700">[PENDING] </span>
      {children}
    </div>
  );
}

/** Small uppercase label. Rationed per the design system - max one per 3 sections. */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-gold-500" : "text-olive-600"
      }`}
    >
      {children}
    </p>
  );
}

/** Short gold accent rule - the site's one recurring decorative flourish. */
export function AccentRule({ className = "" }: { className?: string }) {
  return <div className={`h-1 w-14 rounded-full bg-gold-500 ${className}`} />;
}

/**
 * Photography placeholder. Real client photography is still pending (Build
 * Plan §06, open question 04) - this is a deliberate empty-state treatment
 * (an animated brand-gradient wash, no unrelated stock imagery) rather than
 * a fake photo. Swap for an <Image> pointed at the real asset once supplied;
 * the `seed` prop is kept as a stable key so each slot is easy to find and
 * replace individually. `tone="dark"` is for use on a green/dark section.
 */
export function ImageFrame({
  seed,
  alt,
  aspect = "aspect-[4/5]",
  tone = "light",
  className = "",
}: {
  seed: string;
  alt: string;
  aspect?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      data-placeholder-seed={seed}
      className={`animate-gradient-pan relative flex items-center justify-center overflow-hidden rounded-2xl ${aspect} ${
        tone === "dark"
          ? "bg-gradient-to-br from-green-900 via-green-700 to-olive-600"
          : "border border-cream-200 bg-gradient-to-br from-green-700/25 via-gold-500/20 to-olive-400/25"
      } ${className}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${
          tone === "dark" ? "bg-gold-500/25" : "bg-gold-500/30"
        }`}
      />
      <div className="animate-float relative flex flex-col items-center gap-2 px-6 text-center">
        <Camera
          size={28}
          weight="light"
          className={tone === "dark" ? "text-cream-100/70" : "text-green-700/60"}
        />
        <p
          className={`text-xs font-medium uppercase tracking-wide ${
            tone === "dark" ? "text-cream-100/70" : "text-green-700/60"
          }`}
        >
          Photography pending
        </p>
      </div>
    </div>
  );
}

const ICON_TONES = {
  green: "bg-green-700/10 text-green-700",
  olive: "bg-olive-600/10 text-olive-600",
  gold: "bg-gold-500/15 text-gold-700",
} as const;

/** Small tabular numeral badge - ties a feature back to its position in a
 * numbered sequence (01, 02, 03...) rather than leaving it as an anonymous
 * grid item. */
export function NumberMark({
  index,
  tone = "light",
  className = "",
}: {
  index: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`text-sm font-semibold tabular-nums ${
        tone === "dark" ? "text-cream-100/35" : "text-ink-soft/35"
      } ${className}`}
    >
      {String(index).padStart(2, "0")}
    </span>
  );
}

export function IconFeature({
  icon,
  name,
  body,
  tone = "green",
  index,
}: {
  icon: ReactNode;
  name: string;
  body: string;
  tone?: keyof typeof ICON_TONES;
  index?: number;
}) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${ICON_TONES[tone]}`}
        >
          {icon}
        </div>
        {index !== undefined ? <NumberMark index={index} /> : null}
      </div>
      <h3 className="font-semibold text-ink">{name}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

/** Isolated emphasis treatment for one strong statement - a left accent bar
 * with larger italic type, used to give a closing line its own moment
 * instead of letting it blend into a run of plain paragraphs. */
export function PullQuote({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`border-l-4 border-gold-500 pl-5 text-xl italic leading-snug sm:text-2xl ${
        tone === "dark" ? "text-cream-100" : "text-green-700"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** First paragraph of a stacked prose block, set larger and medium-weight
 * so a run of body copy opens with a clear lead line instead of uniform
 * paragraph-after-paragraph text. */
export function Lede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-lg font-medium leading-relaxed text-ink sm:text-xl ${className}`}>
      {children}
    </p>
  );
}

export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t-2 border-gold-500 pt-4">
      <p className="text-3xl font-semibold text-green-700 sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-olive-600/30 bg-cream-100 px-4 py-1.5 text-sm text-olive-600 transition hover:border-olive-600 hover:bg-olive-600/10">
      {children}
    </span>
  );
}

export function CTAButton({
  href,
  children,
  tone = "solid",
}: {
  href: string;
  children: ReactNode;
  tone?: "solid" | "inverted";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
        tone === "inverted"
          ? "bg-cream-100 text-green-700 shadow-lg shadow-green-900/20 hover:bg-cream-200"
          : "bg-green-700 text-cream-100 shadow-lg shadow-green-700/20 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30"
      }`}
    >
      {children}
    </Link>
  );
}
