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
import csrPage from "./csrPage";
import contactPage from "./contactPage";

// Rebuilt Nov 2026 to match the real, current site (see DECISIONS.md and
// ARCHITECTURE.md) - the original `page` type (generic title/slug/
// sections[]) is gone, replaced by one singleton schema per page
// (homePage/aboutPage/privateLabelPage/csrPage/contactPage) plus the
// repeatable content types each page pulls cards from.
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
    csrPage,
    contactPage,
  ],
};
