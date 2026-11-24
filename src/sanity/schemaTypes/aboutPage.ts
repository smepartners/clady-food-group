import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/about/page.tsx. SECTORS
// (Retail/Cafés/Food service/Hospitality, fixed-icon, rarely changes) is
// left as code rather than modelled here; ACCREDITATIONS is its own
// repeatable `accreditation` type instead, since it's reused in the
// Studio desk the same way facilities/produce categories are.
export default defineType({
  name: "aboutPage",
  title: "About page",
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
        defineField({ name: "image", title: "Background photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
      ],
    }),
    defineField({
      name: "portfolioSection",
      title: "Portfolio statement",
      type: "object",
      fields: [
        defineField({
          name: "hidden",
          title: "Hide this section",
          description: "Temporarily hide this section from the live site without deleting its content.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
      ],
    }),
    defineField({
      name: "heritageSection",
      title: "\"From family business to group\" band",
      type: "object",
      fields: [
        defineField({
          name: "hidden",
          title: "Hide this section",
          description: "Temporarily hide this section from the live site without deleting its content.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "manufacturingSection",
      title: "Manufacturing band",
      type: "object",
      fields: [
        defineField({
          name: "hidden",
          title: "Hide this section",
          description: "Temporarily hide this section from the live site without deleting its content.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "howWeWorkSection",
      title: "\"How we work\" section",
      type: "object",
      fields: [
        defineField({
          name: "hidden",
          title: "Hide this section",
          description: "Temporarily hide this section from the live site without deleting its content.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
      ],
    }),
  ],
  preview: { prepare() { return { title: "About page" }; } },
});
