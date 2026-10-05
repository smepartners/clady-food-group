// Shared brand list - single source of truth for anywhere the site needs
// more than just a name/slug pairing (nav, footer, the compact brand grid).
// The homepage and /brands index carry their own richer copies (straps,
// longer descriptions) since they need more than this.
// `logo` is each brand's real supplied logo mark (Oct 2026) - see
// public/PHOTO-CREDITS.md. Previously this was a pending content gap
// (ARCHITECTURE.md, Build Plan §06 open question 04); all four brands now
// have one, rendered as a small badge over the product photo (see
// BrandGrid in ui.tsx) rather than replacing the photo itself.
export const BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    seed: "clady-evolving-state-wellness",
    tone: "green" as const,
    photo: "/photo-brand-evolving-state.jpg",
    logo: "/logo-evolving-state.png",
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    seed: "clady-galway-roast-coffee",
    tone: "gold" as const,
    photo: "/photo-brand-galway-roast.jpg",
    logo: "/logo-galway-roast.png",
  },
  {
    slug: "dutch-maid",
    name: "Dutch Maid",
    seed: "clady-dutch-maid-soluble",
    tone: "olive" as const,
    photo: "/photo-brand-dutch-maid.jpg",
    logo: "/logo-dutch-maid.png",
  },
  {
    slug: "slumberjack",
    name: "Slumberjack",
    seed: "clady-slumberjack-coffee",
    tone: "green" as const,
    photo: "/photo-brand-slumberjack.jpg",
    logo: "/logo-slumberjack.svg",
  },
] as const;
