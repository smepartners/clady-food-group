import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { BRANDS } from "@/lib/brands";
import { FACILITIES } from "@/lib/facilities";

/** Leather texture + icon-mark watermark, dropped into a solid block for
 * depth - the brand pack's "texture backgrounds" (p.12) and "logo icons"
 * (p.14, background logo for depth) treatments, using the real texture
 * photography and icon-mark assets supplied by Zoe (SME Partners). Sits
 * behind `relative` content via z-index, so wrap sibling content in a
 * `relative` wrapper (most callers already have one for their own glow
 * blobs). Defaults to the green leather swatch on `mix-blend-multiply` -
 * the original treatment, built for `bg-green-700` blocks. Pass `texture`/
 * `watermark`/`blend`/`opacity` to use the gold leather swatch on a darker
 * base instead (see the accreditation panel). */
export function TextureOverlay({
  className = "",
  texture = "/texture-leather-green.jpg",
  watermark = "/logo-icon-watermark.png",
  blend = "mix-blend-multiply",
  opacity = "opacity-70",
}: {
  className?: string;
  texture?: string;
  watermark?: string;
  blend?: string;
  opacity?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Image src={texture} alt="" fill className={`object-cover ${opacity} ${blend}`} />
      <Image
        src={watermark}
        alt=""
        width={900}
        height={900}
        className="absolute -right-20 top-1/2 w-[24rem] -translate-y-1/2 opacity-80 sm:w-[30rem]"
      />
    </div>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>;
}

const BRAND_DOT_TONE = {
  green: "bg-green-700",
  gold: "bg-gold-500",
  olive: "bg-olive-600",
} as const;

/** Compact 4-up brand grid - a nod to the portfolio on pages that don't need
 * the full imagery/strap treatment on the homepage and /brands index, but
 * where plain text links would sell the brands short. */
export function BrandGrid({
  label = "Part of the Clady Group portfolio",
  cols = 4,
  className = "",
}: {
  label?: string;
  // Pass 2 in a narrower container (e.g. a form-page copy column) so the
  // thumbnails don't get squeezed - Tailwind's grid-cols breakpoints are
  // viewport-, not container-, based, so this can't just be responsive.
  cols?: 2 | 4;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive-600">
        {label}
      </p>
      <ul className={`mt-5 grid grid-cols-2 gap-4 ${cols === 4 ? "sm:grid-cols-4" : ""}`}>
        {BRANDS.map((b) => (
          <li key={b.slug}>
            <Link href={`/brands/${b.slug}`} className="group block">
              <div className="overflow-hidden rounded-xl transition duration-300 group-hover:-translate-y-1">
                <ImageFrame seed={b.seed} alt={b.name} src={b.photo} aspect="aspect-square" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${BRAND_DOT_TONE[b.tone]}`} />
                <span className="truncate text-sm font-semibold text-ink transition group-hover:text-green-700">
                  {b.name}
                </span>
                <ArrowUpRight
                  size={13}
                  weight="bold"
                  className="ml-auto shrink-0 text-ink-soft opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
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
 * Photography slot. Pass `src` to render the real photo (currently sourced,
 * free-licence stock photography via Unsplash/Pexels - see
 * public/PHOTO-CREDITS.md - standing in until real Clady Group photography
 * is supplied, Build Plan §06 open question 04). Omit `src` to fall back to
 * the empty-state placeholder treatment (an animated brand-gradient wash, no
 * unrelated imagery). The `seed` prop is kept as a stable key so each slot is
 * easy to find and replace individually. `tone="dark"` is for use on a
 * green/dark section.
 */
export function ImageFrame({
  seed,
  alt,
  src,
  aspect = "aspect-[4/5]",
  tone = "light",
  className = "",
  priority = false,
}: {
  seed: string;
  alt: string;
  src?: string;
  aspect?: string;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div
        data-photo-seed={seed}
        className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

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
 * paragraph-after-paragraph text. `tone="dark"` is for use on a green/dark
 * section (see FacilityStrip/StatTile) - color is switched via this prop
 * rather than a passed-in className override, since Tailwind resolves
 * conflicting utility classes by their order in the generated stylesheet,
 * not by the order they appear in the class list, so a `text-cream-100`
 * passed in via className is not guaranteed to beat the base `text-ink`. */
export function Lede({
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
      className={`text-lg font-medium leading-relaxed sm:text-xl ${
        tone === "dark" ? "text-cream-100" : "text-ink"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** `size="lg"` is for a stat that needs to carry a page on its own - the
 * homepage fold and the About "at a glance" band, where the whole point is
 * to register at a glance rather than reward reading. Keep the default
 * (`"md"`, the original size) everywhere a stat sits alongside other
 * content instead of leading it. */
export function StatTile({
  value,
  label,
  size = "md",
  tone = "light",
}: {
  value: string;
  label: string;
  size?: "md" | "lg";
  tone?: "light" | "dark";
}) {
  return (
    <div className="border-t-2 border-gold-500 pt-4">
      <p
        className={`font-semibold tabular-nums ${
          size === "lg" ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"
        } ${tone === "dark" ? "text-cream-100" : "text-green-700"}`}
      >
        {value}
      </p>
      <p className={`mt-1 text-sm ${tone === "dark" ? "text-cream-100/70" : "text-ink-soft"}`}>{label}</p>
    </div>
  );
}

/** Compact list of the group's manufacturing sites (Buxton, Belfast,
 * Galway - see lib/facilities.ts) with a pin marker per site. A multi-site
 * manufacturing footprint is one of the more concrete, truthful signals of
 * scale Clady can make - client feedback was that the site reads smaller
 * than the business actually is, and this is real information that was
 * previously buried as a label string on a single stat tile rather than
 * shown as what it is: three separate, named sites. */
export function FacilityStrip({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
      {FACILITIES.map((f) => (
        <li key={f.name} className="flex items-center gap-2">
          <MapPin
            size={18}
            weight="bold"
            className={tone === "dark" ? "text-gold-500" : "text-green-700"}
          />
          <span className={`font-semibold ${tone === "dark" ? "text-cream-100" : "text-ink"}`}>
            {f.name}
          </span>
          <span className={tone === "dark" ? "text-cream-100/60" : "text-ink-soft"}>
            {f.region}
          </span>
        </li>
      ))}
    </ul>
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
