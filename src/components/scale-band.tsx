"use client";

import type { ReactNode } from "react";
import { StatTile, FacilityStrip } from "@/components/ui";
import { RevealStagger } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

/**
 * The "12+ / 3 / 4" scale stats plus the named manufacturing sites - the
 * same block, styled once, reused on Home, Private Label and About instead
 * of three near-identical copies. Reads the active preview style so all
 * three pick up the "Bold" dark treatment together. `icon` per stat is
 * optional but every current caller supplies one - it's what makes the row
 * read as a confident "impact" band rather than three bare numbers.
 */
export function ScaleBand({
  stats,
  showFacilities = true,
  className = "",
}: {
  stats: { value: string; label: string; icon?: ReactNode }[];
  showFacilities?: boolean;
  className?: string;
}) {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <div className={className}>
      <RevealStagger
        className={`grid gap-x-8 gap-y-10 border-t pt-12 sm:grid-cols-3 ${
          bold ? "border-cream-100/15" : "border-cream-200"
        }`}
      >
        {stats.map((s) => (
          <StatTile
            key={s.label}
            value={s.value}
            label={s.label}
            icon={s.icon}
            size="lg"
            tone={bold ? "dark" : "light"}
          />
        ))}
      </RevealStagger>
      {showFacilities ? (
        <FacilityStrip
          tone={bold ? "dark" : "light"}
          className={`mt-8 border-t pt-8 ${bold ? "border-cream-100/15" : "border-cream-200"}`}
        />
      ) : null}
    </div>
  );
}
