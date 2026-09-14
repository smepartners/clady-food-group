import type { ReactNode } from "react";
import Link from "next/link";
import { Camera } from "@phosphor-icons/react/dist/ssr";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>;
}

export function Section({
  children,
  className = "",
  pad = "py-20 sm:py-28",
}: {
  children: ReactNode;
  className?: string;
  // Full padding utility string - replaces the default rather than merging
  // with it, since layering py- and pt-/pb- overrides in one class list
  // has no reliable winner in Tailwind's generated cascade.
  pad?: string;
}) {
  return (
    <section className={`${pad} ${className}`}>
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
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive-600">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={`text-2xl font-semibold text-green-700 sm:text-3xl ${eyebrow ? "mt-2" : ""}`}>
        {title}
      </h2>
    </div>
  );
}

/**
 * Photography placeholder. Real client photography is still pending (Build
 * Plan §06, open question 04) - this is a deliberate empty-state treatment
 * (brand-tinted gradient, no unrelated stock imagery) rather than a fake
 * photo. Swap for an <Image> pointed at the real asset once supplied; the
 * `seed` prop is kept as a stable key so each slot is easy to find and
 * replace individually.
 */
export function ImageFrame({
  seed,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
}: {
  seed: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      data-placeholder-seed={seed}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-cream-200 bg-gradient-to-br from-green-700/15 via-olive-400/15 to-gold-500/15 ${aspect} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <Camera size={28} weight="light" className="text-green-700/50" />
        <p className="text-xs font-medium uppercase tracking-wide text-green-700/50">
          Photography pending
        </p>
      </div>
    </div>
  );
}

export function IconFeature({
  icon,
  name,
  body,
}: {
  icon: ReactNode;
  name: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700/10 text-green-700">
        {icon}
      </div>
      <h3 className="font-semibold text-ink">{name}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-cream-200 pt-4">
      <p className="text-3xl font-semibold text-green-700 sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-olive-600/30 bg-cream-100 px-4 py-1.5 text-sm text-olive-600">
      {children}
    </span>
  );
}

export function CTAButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-green-900 active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}
