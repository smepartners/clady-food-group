// Single source of truth for the production domain, now that the site is
// deployed at cladyfoodgroup.com (George, Oct 2026) - used by robots.ts,
// sitemap.ts and layout.tsx's metadataBase so canonical/OG URLs and the
// crawl config all point at the real domain instead of a relative/guessed
// one.
export const SITE_URL = "https://cladyfoodgroup.com";
