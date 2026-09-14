import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` while developing so content updates show without a CDN cache
  // delay; flip to `true` once the site is live and stable.
  useCdn: false,
});
