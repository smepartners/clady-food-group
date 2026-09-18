// Shared brand list - single source of truth for anywhere the site needs
// more than just a name/slug pairing (nav, footer, the compact brand grid).
// The homepage and /brands index carry their own richer copies (straps,
// longer descriptions) since they need more than this.
export const BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    seed: "clady-evolving-state-wellness",
    tone: "green" as const,
    photo: "/photo-brand-evolving-state.jpg",
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    seed: "clady-galway-roast-coffee",
    tone: "gold" as const,
    photo: "/photo-brand-galway-roast.jpg",
  },
  {
    slug: "dutch-maid",
    name: "Dutch Maid",
    seed: "clady-dutch-maid-soluble",
    tone: "olive" as const,
    photo: "/photo-brand-dutch-maid.jpg",
  },
  {
    slug: "slumberjack",
    name: "Slumberjack",
    seed: "clady-slumberjack-coffee",
    tone: "green" as const,
    photo: "/photo-brand-slumberjack.jpg",
  },
] as const;
