"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { studioGuideTool } from "./src/sanity/StudioGuideTool";
import { presentationLocations } from "./src/sanity/presentation";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  tools: (prev) => [...prev, studioGuideTool],
  plugins: [
    structureTool({ structure }),
    // Live split-screen preview (George, Nov 2026: "make sanity show
    // preview of pages before saving") - opens the real page beside the
    // editing form and updates it as fields change, before Publish.
    // previewUrl.previewMode.enable points at the draft-mode route
    // (src/app/api/draft-mode/enable/route.ts), which is what makes the
    // previewed page read unpublished content in the first place.
    // resolve.locations (src/sanity/presentation.ts) is the per-document-
    // type map of "which URL is this document's page".
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: presentationLocations,
    }),
    // Vision lets editors run raw GROQ queries from within the Studio -
    // handy while wiring up new page templates. Safe to remove pre-launch.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
