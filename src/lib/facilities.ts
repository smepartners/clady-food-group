// Manufacturing locations, confirmed by the client (Zoe, SME Partners) - see
// the Brand Guidelines note in Notion. Single source of truth so the
// homepage, About and Private Label pages present the same three sites
// consistently rather than each hardcoding its own copy of the list.
export const FACILITIES = [
  { name: "Buxton", region: "England" },
  { name: "Belfast", region: "Northern Ireland" },
  { name: "Galway", region: "Ireland" },
] as const;
