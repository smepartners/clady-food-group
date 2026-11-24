import type { StructureResolver } from "sanity/structure";

// Custom desk structure: pins every singleton (siteSettings plus the
// five per-page content documents added Nov 2026) at the top with no
// "create new"/list view, since exactly one of each should ever exist.
// Everything else (brand, facility, produceCategory, accreditation,
// valuePillar, stat, csrInitiative) gets the normal list view below.
const SINGLETONS = [
  { type: "siteSettings", title: "Site settings" },
  { type: "homePage", title: "Home page" },
  { type: "aboutPage", title: "About page" },
  { type: "privateLabelPage", title: "Private Label page" },
  { type: "whiteLabelCoffeePage", title: "White Label Coffee page" },
  { type: "csrPage", title: "CSR page" },
  { type: "contactPage", title: "Contact page" },
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .child(S.document().schemaType(s.type).documentId(s.type))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.some((s) => s.type === item.getId())
      ),
    ]);
