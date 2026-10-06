"use client";

import { useState } from "react";
import { HomeHero } from "@/components/home-hero";
import { HomeHeroVideo } from "@/components/home-hero-video";

/**
 * Lets Clady switch the live homepage between the two hero concepts
 * without us touching code - the masonry grid (six real looping clips)
 * and the full company-story video, split alongside the text. A fixed
 * pill in the bottom-right corner rather than anything inside the hero
 * itself, so it reads as a review control rather than a piece of real
 * site content, and stays reachable while scrolling the rest of the
 * page. Defaults to the grid, since that's the version the brief has
 * settled on; this is for comparing, not for picking a permanent default.
 */
export function HeroSwitcher() {
  const [variant, setVariant] = useState<"grid" | "video">("grid");

  return (
    <div>
      {variant === "grid" ? <HomeHero /> : <HomeHeroVideo />}

      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-cream-100/20 bg-ink/95 p-1 text-sm text-cream-100 shadow-xl shadow-ink/30 backdrop-blur">
        <span className="pl-3 pr-1 text-xs font-medium uppercase tracking-wide text-cream-100/50">
          Hero
        </span>
        <button
          type="button"
          onClick={() => setVariant("grid")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            variant === "grid" ? "bg-gold-500 text-ink" : "text-cream-100/70 hover:text-cream-100"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => setVariant("video")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            variant === "video" ? "bg-gold-500 text-ink" : "text-cream-100/70 hover:text-cream-100"
          }`}
        >
          Video
        </button>
      </div>
    </div>
  );
}
