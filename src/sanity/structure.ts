import type { StructureResolver } from "sanity/structure";

// Restructured Nov 2026 (George: "sanity should probably have pages under
// a pages section etc. as very confusing currently"). Previously every
// singleton page sat in one flat list above a divider, with the
// repeatable content types below it - editors had to already know which
// of the ~13 items in that list were pages vs. reusable content. Now
// grouped into three clearly-labelled sections:
//  - Site settings, pinned alone at the top (nav/footer/contact details -
//    not a page itself).
//  - "Pages" - everything a visitor can land on: the five bespoke
//    singleton pages, Contact, and the repeatable "Page (build your own)"
//    type together in one place.
//  - "Content library" - the repeatable content types pages pull from
//    (brands, facilities, stats, etc.), not pages themselves.
const PAGE_SINGLETONS = [
  { type: "homePage", title: "Home page" },
  { type: "aboutPage", title: "About page" },
  { type: "privateLabelPage", title: "Private Label page" },
  { type: "whiteLabelCoffeePage", title: "White Label Coffee page" },
  { type: "csrPage", title: "CSR page" },
  { type: "contactPage", title: "Contact page" },
] as const;

const LIBRARY_TYPES = [
  "brand",
  "facility",
  "produceCategory",
  "accreditation",
  "valuePillar",
  "stat",
  "csrInitiative",
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              ...PAGE_SINGLETONS.map((s) =>
                S.listItem()
                  .title(s.title)
                  .child(S.document().schemaType(s.type).documentId(s.type))
              ),
              S.divider(),
              S.documentTypeListItem("flexiblePage").title("Pages (build your own)"),
            ])
        ),
      S.listItem()
        .title("Content library")
        .child(
          S.list()
            .title("Content library")
            .items(
              S.documentTypeListItems().filter((item) =>
                (LIBRARY_TYPES as readonly string[]).includes(item.getId() ?? "")
              )
            )
        ),
    ]);
