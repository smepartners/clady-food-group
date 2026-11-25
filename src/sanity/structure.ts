import type { StructureResolver } from "sanity/structure";

// Restructured Nov 2026 (George: "sanity should probably have pages under
// a pages section etc. as very confusing currently"; then again, 25th:
// "brands should be broken out separately"). Previously every singleton
// page sat in one flat list above a divider, with the repeatable content
// types below it - editors had to already know which of the ~13 items in
// that list were pages vs. reusable content. Grouped into five clearly-
// labelled top-level sections:
//  - Site settings, pinned alone at the top (nav/footer/contact details -
//    not a page itself).
//  - "Pages" - everything a visitor can land on: the five bespoke
//    singleton pages, Contact, and the repeatable "Page (build your own)"
//    type together in one place.
//  - "Brands" - its own top-level section rather than buried alongside
//    facilities/stats/etc. in the library below, since it's the content
//    type editors (and Zoe/the client) open far more often than any
//    other.
//  - "Content library" - the remaining repeatable content types pages
//    pull from (facilities, stats, accreditations, etc.), not pages
//    themselves and not brands.
//  - "Enquiries" - read-only-in-spirit log of contact-form submissions
//    (src/app/api/contact/route.ts writes these; see schemaTypes/
//    enquiry.ts), newest first, each tagged with the brand it came from
//    if it came from a brand page's popup rather than the main Contact
//    page.
const PAGE_SINGLETONS = [
  { type: "homePage", title: "Home page" },
  { type: "aboutPage", title: "About page" },
  { type: "privateLabelPage", title: "Private Label page" },
  { type: "whiteLabelCoffeePage", title: "White Label Coffee page" },
  { type: "csrPage", title: "CSR page" },
  { type: "contactPage", title: "Contact page" },
] as const;

const LIBRARY_TYPES = [
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
      S.documentTypeListItem("brand").title("Brands"),
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
      S.divider(),
      S.listItem()
        .title("Enquiries")
        .child(
          S.documentTypeList("enquiry")
            .title("Enquiries")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
    ]);
