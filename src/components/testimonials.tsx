"use client";

import { Quotes } from "@phosphor-icons/react";
import { RevealStagger } from "@/components/reveal";

/**
 * Placeholder testimonials for design sign-off on the staging site - see
 * client-logo-bar.tsx for the same rationale (PRD.md open content gap 8).
 * Quotes and attributions below are invented for layout/impact review only,
 * not real customer feedback - each card carries a small "placeholder"
 * badge so it reads unambiguously as sample content, and the whole section
 * is swapped for real quotes once Zoe supplies any.
 */
const PLACEHOLDER_QUOTES = [
  {
    quote:
      "Clady moved from initial brief to shelf-ready product faster than any other manufacturer we've worked with, without compromising on quality.",
    name: "Procurement Lead",
    org: "Placeholder Retail Co.",
  },
  {
    quote:
      "Their private label team understood exactly what our brand needed and delivered a consistent product across every batch.",
    name: "Category Manager",
    org: "Sample Wholesale Group",
  },
  {
    quote:
      "A genuine partnership approach - responsive, flexible, and easy to work with at every stage of the process.",
    name: "Operations Director",
    org: "Example Foodservice Ltd.",
  },
];

export function Testimonials({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
        What customers say
      </p>
      <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-3">
        {PLACEHOLDER_QUOTES.map((t) => (
          <div
            key={t.name}
            className="relative flex h-full flex-col rounded-2xl border border-cream-200 bg-cream-100 p-6"
          >
            <span className="absolute right-5 top-5 rounded-full bg-cream-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
              Placeholder
            </span>
            <Quotes size={28} weight="fill" className="text-gold-500" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 border-t border-cream-200 pt-4">
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-ink-soft">{t.org}</p>
            </div>
          </div>
        ))}
      </RevealStagger>
      <p className="mt-6 text-xs italic text-ink-soft/70">
        Placeholder quotes for design review - not real customer feedback. To
        be replaced with approved testimonials once supplied.
      </p>
    </div>
  );
}
