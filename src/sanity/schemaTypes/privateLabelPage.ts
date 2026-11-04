import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/private-label/page.tsx.
// SCALE_STATS is covered by the shared `stat` documents; PRODUCE_CATEGORIES
// is the `produceCategory` type. PILLARS ("From idea to opportunity":
// Product expertise/Market awareness/Flexibility/Consistency/
// Collaboration) is page-specific with a small, fixed icon set, so it
// stays as an inline array here rather than its own document type.
export default defineType({
  name: "privateLabelPage",
  title: "Private Label page",
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
      name: "moreThanALogoSection",
      title: "\"More than a logo\" band",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "flexibleApproachSection",
      title: "\"A flexible approach\" band",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "From idea to opportunity: pillars",
      type: "array",
      of: [
        {
          type: "object",
          name: "pillar",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["Package", "ChartLineUp", "Lightning", "CheckCircle", "UsersThree"],
              },
            }),
            defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare() { return { title: "Private Label page" }; } },
});
