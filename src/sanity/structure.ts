import type { StructureResolver } from "sanity/structure";

// Custom desk structure: pulls siteSettings out as a singleton (no "create
// new" / list view for it) and groups everything else normally.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "siteSettings"
      ),
    ]);
