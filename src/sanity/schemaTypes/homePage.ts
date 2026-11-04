import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton - the Home page's own editable copy blocks.
// Matches src/app/(site)/page.tsx and home-hero-video.tsx. Things that
// are structural/decorative rather than client-editable content (button
// hrefs, which clips play in the hero, section backgrounds) are left as
// code, not modelled here. Group scale stats and "What drives us" values
// are their own repeatable types (stat, valuePillar) rather than fields
// on this document, since they're reused across pages.
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
      name: "capabilityBand",
      title: "\"One group. Multiple capabilities.\" band",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Body paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
      ],
    }),
    defineField({
      name: "manufacturingBand",
      title: "Manufacturing scale band",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "image", title: "Background photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "closingBand",
      title: "\"Built for better partnerships\" closing band",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
      ],
    }),
  ],
  preview: { prepare() { return { title: "Home page" }; } },
});
