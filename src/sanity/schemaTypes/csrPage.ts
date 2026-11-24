import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/csr/page.tsx. GREEN_
// CREDENTIALS is the `csrInitiative` type. PILLARS ("Our people"/"Our
// customers and partners"/"Our products" - fixed 3-item icon set) stays
// inline here, same reasoning as privateLabelPage's `pillars`.
export default defineType({
  name: "csrPage",
  title: "CSR page",
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
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pillars",
      title: "Our responsibility: pillars",
      type: "array",
      of: [
        {
          type: "object",
          name: "pillar",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ["UsersThree", "Handshake", "Leaf"] },
            }),
            defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
          ],
        },
      ],
    }),
    defineField({
      name: "responsibilitySection",
      title: "\"Our responsibility\" section",
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
        defineField({ name: "quote", title: "Pull quote", type: "string" }),
      ],
    }),
    defineField({
      name: "impactSection",
      title: "\"Our impact\" section",
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
      ],
    }),
  ],
  preview: { prepare() { return { title: "CSR page" }; } },
});
