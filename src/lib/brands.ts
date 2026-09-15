// Shared brand list - single source of truth for anywhere the site needs
// just the name/slug pairing (nav, footer, lightweight brand strips).
// The homepage and /brands index carry their own richer copies of this
// list (straps, seeds, imagery) since they need more than name + slug.
export const BRANDS = [
  { slug: "evolving-state", name: "Evolving State" },
  { slug: "galway-roast", name: "Galway Roast" },
  { slug: "dutch-maid", name: "Dutch Maid" },
  { slug: "slumberjack", name: "Slumberjack" },
] as const;
