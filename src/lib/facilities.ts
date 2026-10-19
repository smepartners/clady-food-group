// Manufacturing locations, confirmed by the client (Zoe, SME Partners) - see
// the Brand Guidelines note in Notion. Single source of truth so the
// homepage, About and Private Label pages present the same sites
// consistently rather than each hardcoding its own copy of the list.
//
// Galway dropped from this list (George, Oct 2026), initially just for the
// footer's "Where we manufacture" strip (FacilityStrip in ui.tsx, used by
// site-footer.tsx). The group is now confirmed as a two-site operation
// (Buxton, Belfast) sitewide - the homepage's own "manufacturing
// operations in..." sentence and the private-label page's site-count stat
// (both hardcoded strings, not driven by this list) were updated to match.
export const FACILITIES = [
  { name: "Buxton", region: "England" },
  { name: "Belfast", region: "Northern Ireland" },
] as const;
