"use client";

import { RevealStagger } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * "Who we work with" - PRD.md open content gap 8. Clady has not yet
 * confirmed which customers it's permitted to name publicly, so this ships
 * as placeholder wordmarks for design sign-off on the staging site, not
 * real client names or logo files - deliberately generic, invented
 * category-style names ("Northfield Foods", "Catering Partners Group") that
 * don't resemble any real retailer or wholesaler, so nobody mistakes this
 * for an actual customer list before Zoe confirms one. Swap `PLACEHOLDER_
 * CLIENTS` for real names + logo image files (same pattern as
 * `AccreditationGrid`) once that list exists, and drop the pending note.
 *
 * Renders its own dark panel in Bold mode rather than relying on the
 * parent Section's background - the caller's Section is a Server
 * Component and can't read the preview style, so a bold-mode-only text
 * colour with no matching background would go near-invisible against
 * whatever light background the page happens to use.
 */
const PLACEHOLDER_CLIENTS = [
  "Northfield Foods",
  "Catering Partners Group",
  "Vendpoint",
  "Marketview Retail",
  "Wholesale Alliance Co.",
  "Foodservice Direct",
];

export function ClientLogoBar({ className = "" }: { className?: string }) {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <div
      className={`${
        bold ? "rounded-3xl bg-green-900 px-5 py-8 sm:px-8 sm:py-10" : ""
      } ${className}`}
    >
      <p className={`text-sm font-semibold uppercase tracking-wide ${bold ? "text-gold-500" : "text-olive-600"}`}>
        Who we work with
      </p>
      <RevealStagger className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {PLACEHOLDER_CLIENTS.map((name) => (
          <div
            key={name}
            className={`flex h-12 items-center justify-center text-center text-sm font-semibold uppercase tracking-wide opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${
              bold ? "text-cream-100" : "text-ink"
            }`}
          >
            {name}
          </div>
        ))}
      </RevealStagger>
      <p className={`mt-6 text-xs italic ${bold ? "text-cream-100/50" : "text-ink-soft/70"}`}>
        Placeholder names for design review - not a real client list. To be
        replaced with confirmed, permitted customer names once supplied.
      </p>
    </div>
  );
}
