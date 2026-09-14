import { type SchemaTypeDefinition } from "sanity";

import brand from "./brand";
import page from "./page";
import valuePillar from "./valuePillar";
import stat from "./stat";
import csrInitiative from "./csrInitiative";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [brand, page, valuePillar, stat, csrInitiative, siteSettings],
};
