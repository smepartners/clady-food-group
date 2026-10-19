// Manufacturing locations, confirmed by the client (Zoe, SME Partners) - see
// the Brand Guidelines note in Notion. Single source of truth so the
// homepage, About and Private Label pages present the same sites
// consistently rather than each hardcoding its own copy of the list.
//
// Galway dropped from this list (George, Oct 2026) - this feeds the
// footer's "Where we manufacture" strip (FacilityStrip in ui.tsx, used by
// site-footer.tsx), and that's the one place George flagged it still
// showing. The homepage's own "Buxton, Belfast and Galway" sentence is a
// separate hardcoded string in app/(site)/page.tsx, not driven by this
// list - untouched here since the ask was specifically the footer.
export const FACILITIES = [
  { name: "Buxton", region: "England" },
  { name: "Belfast", region: "Northern Ireland" },
] as const;
