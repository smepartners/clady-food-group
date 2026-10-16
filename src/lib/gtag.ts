/**
 * Google Analytics (GA4) helpers. The base tag is loaded once in the root
 * layout (src/app/layout.tsx) via next/script; this file just gives the
 * rest of the app a typed, safe way to fire events on top of it (e.g. the
 * contact form reporting a submission - see contact-form.tsx).
 *
 * GA_MEASUREMENT_ID is the property ID George supplied for the live site
 * (G-2Y1WS4TJBF). Hardcoded rather than env-configured since this is a
 * single-site build with one known GA property, matching how the rest of
 * the site's third-party IDs (LinkedIn URL, phone number) are handled.
 */
export const GA_MEASUREMENT_ID = "G-2Y1WS4TJBF";

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 event. Safe to call even if the tag hasn't loaded yet (e.g.
 * blocked by an ad blocker, or firing during the brief window before the
 * next/script tag executes) - it's a no-op rather than a thrown error.
 */
export function gtagEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
