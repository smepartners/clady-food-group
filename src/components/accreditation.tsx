"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealStagger } from "@/components/reveal";
import { TextureOverlay } from "@/components/ui";

export type Accreditation = {
  name: string;
  note: string;
  logo?: string;
};

/**
 * A single accreditation's card. Tracks the pointer directly on the DOM
 * node via a ref (not React state - see design-taste-frontend Section 3.B)
 * to drive a spotlight-border glow that follows the cursor, Aceternity-
 * style. Everything else is a plain CSS hover: lift + shadow + the logo
 * losing its grayscale. Falls back to a text pill when no logo is supplied
 * yet, same as the row it replaces. Sits as a bright card on the panel's
 * dark leather backdrop, so it's opaque cream rather than the translucent
 * white it would use on a light section.
 */
function AccreditationCard({ item }: { item: Accreditation }) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className="group relative h-full overflow-hidden rounded-2xl bg-cream-100 p-5 shadow-lg shadow-green-900/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), rgba(184,134,15,0.16), transparent 70%)",
        }}
      />
      <div className="relative flex h-11 items-center">
        {item.logo ? (
          <div className="relative h-full w-28">
            <Image
              src={item.logo}
              alt={`${item.name} certified`}
              fill
              sizes="112px"
              className="object-contain object-left grayscale transition duration-300 group-hover:grayscale-0"
            />
          </div>
        ) : (
          <span className="rounded-full border border-olive-600/30 bg-cream-200 px-4 py-1.5 text-sm text-olive-600">
            {item.name}
          </span>
        )}
      </div>
      <p className="relative mt-4 text-sm font-semibold text-ink">{item.name}</p>
      <p className="relative mt-1 text-sm leading-relaxed text-ink-soft">{item.note}</p>
    </div>
  );
}

/**
 * Replaces the old plain pill row for third-party accreditations/
 * certifications with a self-contained panel: a deep green backdrop
 * dressed in the gold leather texture + angled icon watermark (the same
 * "texture background" brand-pack treatment as `TextureOverlay` on the
 * homepage's green sections, but in gold on green-900 rather than green on
 * green-700 - the one leather swatch on the site that wasn't in use yet),
 * with the certification cards floating on top as bright cream chips for
 * contrast. Entrance-staggered via RevealStagger as the grid scrolls into
 * view, plus a hover spotlight per card. Pass a `logo` per item (the
 * certifying body's official mark - see the sourcing note in the caller) -
 * items without one fall back to a text pill so the grid still reads
 * correctly before every mark is supplied.
 */
export function AccreditationGrid({
  items,
  label,
  className = "",
}: {
  items: Accreditation[];
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-green-900 px-5 py-8 sm:px-8 sm:py-10 ${className}`}>
      <TextureOverlay
        texture="/texture-leather-gold.jpg"
        watermark="/logo-icon-watermark-gold.png"
        blend="mix-blend-soft-light"
        opacity="opacity-60"
      />
      {label ? (
        <p className="relative text-sm font-semibold uppercase tracking-wide text-gold-500">
          {label}
        </p>
      ) : null}
      <RevealStagger className={`relative grid grid-cols-2 gap-4 sm:grid-cols-4 ${label ? "mt-5" : ""}`}>
        {items.map((item) => (
          <AccreditationCard key={item.name} item={item} />
        ))}
      </RevealStagger>
    </div>
  );
}
