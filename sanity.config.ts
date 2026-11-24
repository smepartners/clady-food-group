"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { studioGuideTool } from "./src/sanity/StudioGuideTool";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  tools: (prev) => [...prev, studioGuideTool],
  plugins: [
    structureTool({ structure }),
    // Vision lets editors run raw GROQ queries from within the Studio -
    // handy while wiring up new page templates. Safe to remove pre-launch.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
