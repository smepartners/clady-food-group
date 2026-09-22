"use client";

import { Quotes } from "@phosphor-icons/react";
import { RevealStagger } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * Placeholder testimonials for design sign-off on the staging site - see
 * client-logo-bar.tsx for the same rationale (PRD.md open content gap 8).
 * Quotes and attributions below are invented for layout/impact review only,
 * not real customer feedback - each card carries a small "placeholder"
 * badge so it reads unambiguously as sample content, and the whole section
 * is swapped for real quotes once Zoe supplies any.
 *
 * Renders its own dark panel in Bold mode, same reasoning as
 * client-logo-bar.tsx - the caller's Section can't read the preview style,
 * so this owns its own background instead of assuming a light one.
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
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <div
      className={`${
        bold ? "rounded-3xl bg-green-900 px-5 py-8 sm:px-8 sm:py-10" : ""
      } ${className}`}
    >
      <p className={`text-sm font-semibold uppercase tracking-wide ${bold ? "text-gold-500" : "text-olive-600"}`}>
        What customers say
      </p>
      <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-3">
        {PLACEHOLDER_QUOTES.map((t) => (
          <div
            key={t.name}
            className={`relative flex h-full flex-col rounded-2xl border p-6 ${
              bold ? "border-cream-100/15 bg-cream-100/10" : "border-cream-200 bg-cream-100"
            }`}
          >
            <span
              className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                bold ? "bg-cream-100/10 text-cream-100/50" : "bg-cream-200 text-ink-soft"
              }`}
            >
              Placeholder
            </span>
            <Quotes
              size={28}
              weight="fill"
              className={bold ? "text-gold-500/70" : "text-gold-500"}
            />
            <p className={`mt-4 flex-1 text-sm leading-relaxed ${bold ? "text-cream-100/85" : "text-ink"}`}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className={`mt-5 border-t pt-4 ${bold ? "border-cream-100/15" : "border-cream-200"}`}>
              <p className={`text-sm font-semibold ${bold ? "text-cream-100" : "text-ink"}`}>{t.name}</p>
              <p className={`text-xs ${bold ? "text-cream-100/60" : "text-ink-soft"}`}>{t.org}</p>
            </div>
          </div>
        ))}
      </RevealStagger>
      <p className={`mt-6 text-xs italic ${bold ? "text-cream-100/50" : "text-ink-soft/70"}`}>
        Placeholder quotes for design review - not real customer feedback. To
        be replaced with approved testimonials once supplied.
      </p>
    </div>
  );
}
