"use client";

import { RevealStagger } from "@/components/reveal";

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
  return (
    <div className={className}>
      <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
        Who we work with
      </p>
      <RevealStagger className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {PLACEHOLDER_CLIENTS.map((name) => (
          <div
            key={name}
            className="flex h-12 items-center justify-center text-center text-sm font-semibold uppercase tracking-wide text-ink opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          >
            {name}
          </div>
        ))}
      </RevealStagger>
      <p className="mt-6 text-xs italic text-ink-soft/70">
        Placeholder names for design review - not a real client list. To be
        replaced with confirmed, permitted customer names once supplied.
      </p>
    </div>
  );
}
