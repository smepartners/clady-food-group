"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteStyle = "classic" | "bold";

const SiteStyleContext = createContext<{
  style: SiteStyle;
  setStyle: (s: SiteStyle) => void;
} | null>(null);

const STORAGE_KEY = "clady-site-style-preview";

/**
 * Internal review tool, not a customer-facing feature - lets the team flick
 * every page's hero (and the footer) between the current light treatment
 * and a bolder, green-led variant, so a direction can be compared live
 * across the whole site rather than page by page. Preference is per-browser
 * only (localStorage), so it never affects what a real site visitor sees on
 * first load - it always starts on "classic" and only changes for whoever
 * clicks the toggle in their own browser. Mounted once in the shared
 * `(site)/layout.tsx` so the choice persists across client-side navigation
 * between pages, not just within one.
 *
 * To make a direction permanent once it's picked: delete this file and
 * `SiteStyleToggle`'s usage in the layout, then hardcode the winning
 * branch's classes straight into the components that currently call
 * `useSiteStyle()` (home-hero.tsx, about-hero.tsx, private-label-hero.tsx,
 * csr-hero.tsx, brands-hero.tsx, brand-detail-hero.tsx, contact-hero.tsx,
 * scale-band.tsx, site-footer.tsx). See PRD.md open item 9.
 */
export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [style, setStyleState] = useState<SiteStyle>("classic");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "bold" || saved === "classic") {
        // Reading a browser storage API on mount to sync from that external
        // system is exactly what this effect is for (React docs' own
        // example of a legitimate effect) - the page always renders
        // "classic" first (server and client agree, no hydration
        // mismatch), and this only fires once to pick up a genuine stored
        // preference, so there's no cascading-render risk to guard against.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStyleState(saved);
      }
    } catch {
      // localStorage unavailable (private browsing etc.) - stay on the default
    }
  }, []);

  function setStyle(next: SiteStyle) {
    setStyleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // best-effort only, never blocks the toggle from working this session
    }
  }

  return <SiteStyleContext.Provider value={{ style, setStyle }}>{children}</SiteStyleContext.Provider>;
}

export function useSiteStyle() {
  const ctx = useContext(SiteStyleContext);
  if (!ctx) throw new Error("useSiteStyle must be used within SiteThemeProvider");
  return ctx;
}

/** Floating "Classic / Bold" switch, pinned to the corner so it stays
 * reachable while scrolling and survives navigating between pages.
 * Deliberately styled as a review tool (a small pill, not part of the
 * site's own design language) so nobody mistakes it for a real feature. */
export function SiteStyleToggle() {
  const { style, setStyle } = useSiteStyle();
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-cream-200 bg-white/95 p-1 text-xs font-medium shadow-lg shadow-green-900/15 backdrop-blur">
      <span className="pl-2 pr-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
        Preview style
      </span>
      {(["classic", "bold"] as const).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setStyle(s)}
          aria-pressed={style === s}
          className={`rounded-full px-3 py-1.5 capitalize transition ${
            style === s ? "bg-green-700 text-cream-100" : "text-ink-soft hover:bg-cream-100"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
