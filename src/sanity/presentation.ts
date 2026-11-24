import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// New (Nov 2026, George: "make sanity show preview of pages before
// saving") - tells the Studio's Presentation tool which live-site URL
// each document type corresponds to, so an editor can open a document and
// see the real page update beside it as they type, before publishing.
//
// Singleton pages (one fixed document, one fixed route) just declare their
// URL directly. `brand` and `flexiblePage` use the `select`/`resolve`
// form instead (defineLocations' other shape) since their route depends
// on a field: `brand` follows a confirmed `brand-<slug>` _id convention
// (checked against all three live brand documents), and `flexiblePage`
// reads its own `slug` field - there are no flexiblePage documents yet,
// but this keeps the first one previewable without a second round of
// config.
export const presentationLocations: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      locations: [{ title: "Home page", href: "/" }],
    }),
    aboutPage: defineLocations({
      locations: [{ title: "About page", href: "/about" }],
    }),
    privateLabelPage: defineLocations({
      locations: [{ title: "Private Label page", href: "/private-label" }],
    }),
    whiteLabelCoffeePage: defineLocations({
      locations: [{ title: "White Label Coffee page", href: "/private-label/coffee" }],
    }),
    csrPage: defineLocations({
      locations: [{ title: "CSR page", href: "/csr" }],
    }),
    contactPage: defineLocations({
      locations: [{ title: "Contact page", href: "/contact" }],
    }),
    brand: defineLocations({
      select: { id: "_id" },
      resolve: (doc) => {
        if (!doc?.id) return null;
        const slug = (doc.id as string).replace(/^drafts\./, "").replace(/^brand-/, "");
        return { locations: [{ title: "Brand page", href: `/brands/${slug}` }] };
      },
    }),
    flexiblePage: defineLocations({
      select: { slug: "slug.current" },
      resolve: (doc) => {
        const slug = doc?.slug as string | undefined;
        if (!slug) {
          return { locations: [], message: "Set a slug to preview this page", tone: "caution" };
        }
        return { locations: [{ title: `/${slug}`, href: `/${slug}` }] };
      },
    }),
  },
};
