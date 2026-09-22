"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type HomeStyle = "classic" | "bold";

const HomeStyleContext = createContext<{
  style: HomeStyle;
  setStyle: (s: HomeStyle) => void;
} | null>(null);

const STORAGE_KEY = "clady-home-style-preview";

/**
 * Internal review tool, not a customer-facing feature - lets the team flick
 * the homepage hero between the current light treatment and a bolder,
 * green-led variant to compare before committing to a direction. Preference
 * is per-browser only (localStorage), so it never affects what a real site
 * visitor sees on first load - it always starts on "classic" and only
 * changes for whoever clicks the toggle in their own browser.
 *
 * To make this permanent once a direction is picked: delete this file and
 * `HomeStyleToggle`'s usage, then hardcode the winning branch's classes
 * straight into the components that currently call `useHomeStyle()` (see
 * `home-hero.tsx`). See PRD.md open item 9.
 */
export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const [style, setStyleState] = useState<HomeStyle>("classic");

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

  function setStyle(next: HomeStyle) {
    setStyleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // best-effort only, never blocks the toggle from working this session
    }
  }

  return <HomeStyleContext.Provider value={{ style, setStyle }}>{children}</HomeStyleContext.Provider>;
}

export function useHomeStyle() {
  const ctx = useContext(HomeStyleContext);
  if (!ctx) throw new Error("useHomeStyle must be used within HomeThemeProvider");
  return ctx;
}

/** Floating "Classic / Bold" switch, pinned to the corner so it stays
 * reachable while scrolling the page it controls. Deliberately styled as a
 * review tool (a small pill, not part of the page's own design language)
 * so nobody mistakes it for a real feature of the site. */
export function HomeStyleToggle() {
  const { style, setStyle } = useHomeStyle();
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
