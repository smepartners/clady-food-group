// Shared brand list - single source of truth for anywhere the site needs
// more than just a name/slug pairing (nav, footer, the compact brand grid).
// The homepage and /brands index carry their own richer copies (straps,
// longer descriptions) since they need more than this.
// `logo` is each brand's real supplied logo mark (Oct 2026) - see
// public/PHOTO-CREDITS.md. Previously this was a pending content gap
// (ARCHITECTURE.md, Build Plan §06 open question 04); all four brands now
// have one, rendered as a small badge over the product photo (see
// BrandGrid in ui.tsx) rather than replacing the photo itself.
// Round 5 feedback: ordered to match the priority order Zoe gave for the
// /brands index page (Slumberjack, Dutch Maid, Evolving State, Galway
// Roast) - this is the single source of truth for the nav dropdown, the
// footer brand list and the homepage brand carousel, so reordering it here
// keeps all three in sync rather than drifting from /brands' own order.
export const BRANDS = [
  {
    slug: "slumberjack",
    name: "Slumberjack",
    seed: "clady-slumberjack-coffee",
    tone: "green" as const,
    photo: "/photo-brand-slumberjack.jpg",
    logo: "/logo-slumberjack.svg",
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
] as const;
