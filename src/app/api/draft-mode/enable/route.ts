import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

// Nov 2026: the Presentation tool's preview iframe (sanity.config.ts ->
// presentationTool -> previewUrl) hits this route first. It checks the
// one-time secret Sanity generates, then turns on draft mode and redirects
// into the page being previewed, so the rest of the site's data fetchers
// (sanityFetch, src/sanity/lib/client.ts) start reading unpublished drafts.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
  }),
});
