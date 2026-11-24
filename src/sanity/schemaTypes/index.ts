import { type SchemaTypeDefinition } from "sanity";

import brand from "./brand";
import facility from "./facility";
import produceCategory from "./produceCategory";
import accreditation from "./accreditation";
import valuePillar from "./valuePillar";
import stat from "./stat";
import csrInitiative from "./csrInitiative";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import privateLabelPage from "./privateLabelPage";
import whiteLabelCoffeePage from "./whiteLabelCoffeePage";
import csrPage from "./csrPage";
import contactPage from "./contactPage";
import flexiblePage from "./flexiblePage";

// Rebuilt Nov 2026 to match the real, current site (see DECISIONS.md and
// ARCHITECTURE.md) - the original generic `page` type (title/slug/
// sections[]) was replaced by one singleton schema per existing page
// (homePage/aboutPage/privateLabelPage/whiteLabelCoffeePage/csrPage/
// contactPage) plus the repeatable content types each page pulls cards
// from. `flexiblePage` (added later the same month) brings a generic
// sections[] type back, but only for *new* pages the client builds
// themselves - the existing bespoke pages above stay hand-coded rather
// than being migrated onto it, since their designs are more specific
// than the block library can express.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    brand,
    facility,
    produceCategory,
    accreditation,
    valuePillar,
    stat,
    csrInitiative,
    siteSettings,
    homePage,
    aboutPage,
    privateLabelPage,
    whiteLabelCoffeePage,
    csrPage,
    contactPage,
    flexiblePage,
  ],
};
