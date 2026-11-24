import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/private-label/page.tsx.
// SCALE_STATS is covered by the shared `stat` documents; PRODUCE_CATEGORIES
// is the `produceCategory` type. Pillar icons ("From idea to opportunity":
// Product expertise/Market awareness/Flexibility/Consistency/
// Collaboration) use a small, fixed icon set, so they stay as an inline
// array within the pillarsBlock section rather than their own document type.
//
// Rebuilt Nov 2026 (George: "make it so we can reorder sections from
// pages") - every block on the page, including the "What we produce"
// grid (previously fixed, pulls from produceCategory documents) and the
// "From idea to opportunity" pillars band (previously a fixed top-level
// `pillars` field), now lives in one `sections` array so the whole page
// can be dragged into any order. produceBlock carries only a `hidden`
// field - its content stays the repeatable produceCategory documents,
// it exists purely so its position is part of the same reorderable list.
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
      name: "sections",
      title: "Page sections",
      description: "Add, remove, reorder and hide sections to build the page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "moreThanALogoBand",
          title: "\"More than a logo\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
            defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { prepare: () => ({ title: "More than a logo", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "produceBlock",
          title: "\"What we produce\" grid",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "What we produce", subtitle: "Fixed section - edit under Content library" }) },
        },
        {
          type: "object",
          name: "flexibleApproachBand",
          title: "\"A flexible approach\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
          ],
          preview: { prepare: () => ({ title: "A flexible approach", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "pillarsBlock",
          title: "\"From idea to opportunity\" pillars",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({
              name: "pillars",
              title: "Pillars",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "pillar",
                  fields: [
                    defineField({ name: "name", title: "Name", type: "string" }),
                    defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
                    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ["Package", "ChartLineUp", "Lightning", "CheckCircle", "UsersThree"] } }),
                    defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
                  ],
                },
              ],
            }),
          ],
          preview: { prepare: () => ({ title: "From idea to opportunity", subtitle: "Section" }) },
        },
      ],
    }),
  ],
  preview: { prepare() { return { title: "Private Label page" }; } },
});
