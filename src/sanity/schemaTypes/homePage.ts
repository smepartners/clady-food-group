import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton - the Home page's own editable copy blocks.
// Matches src/app/(site)/page.tsx and home-hero-video.tsx. Things that
// are structural/decorative rather than client-editable content (button
// hrefs, which clips play in the hero, section backgrounds) are left as
// code, not modelled here. Group scale stats and "What drives us" values
// are their own repeatable types (stat, valuePillar) rather than fields
// on this document, since they're reused across pages.
//
// Rebuilt Nov 2026 (George: "make it so we can reorder sections from
// pages") - every block on the page, including the two that used to be
// hardcoded in a fixed spot between the Sanity-editable bands
// (brandCarouselBlock, valuesBlock), now lives in one `sections` array so
// the whole page can be dragged into any order, not just the three
// blocks that happened to have editable copy. brandCarouselBlock/
// valuesBlock carry no content fields of their own (the carousel and
// values both pull from their own repeatable types) - they exist purely
// so their position in the page is part of the same reorderable list.
export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
        defineField({
          name: "video",
          title: "Hero video (muted, looping)",
          type: "file",
          description: "The home hero plays a video, not a static image - upload the mp4 here.",
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description: "Add, remove, reorder and hide sections to build the page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "capabilityBand",
          title: "\"One group. Multiple capabilities.\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "One group. Multiple capabilities.", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "manufacturingBand",
          title: "Manufacturing scale band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Background photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Manufacturing scale band", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "brandCarouselBlock",
          title: "Brand carousel",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "Brand carousel", subtitle: "Fixed section - edit brands under Content library" }) },
        },
        {
          type: "object",
          name: "valuesBlock",
          title: "\"What drives us\" values",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "What drives us (values)", subtitle: "Fixed section - edit values under Content library" }) },
        },
        {
          type: "object",
          name: "closingBand",
          title: "\"Built for better partnerships\" closing band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Built for better partnerships", subtitle: "Section" }) },
        },
      ],
    }),
  ],
  preview: { prepare() { return { title: "Home page" }; } },
});
