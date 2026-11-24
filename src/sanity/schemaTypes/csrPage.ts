import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/csr/page.tsx. GREEN_
// CREDENTIALS is the `csrInitiative` type. Pillar icons ("Our people"/"Our
// customers and partners"/"Our products" - fixed 3-item icon set) stay
// inline within the pillarsBlock section, same reasoning as
// privateLabelPage's pillarsBlock.
//
// Rebuilt Nov 2026 (George: "make it so we can reorder sections from
// pages") - every block on the page, including the intro statement and
// the pillars row (both previously fixed top-level fields with no hide
// toggle), now lives in one `sections` array so the whole page can be
// dragged into any order.
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
      name: "sections",
      title: "Page sections",
      description: "Add, remove, reorder and hide sections to build the page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "introBlock",
          title: "Intro statement",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "intro", title: "Intro statement", type: "text", rows: 3 }),
          ],
          preview: { prepare: () => ({ title: "Intro statement", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "pillarsBlock",
          title: "\"Our responsibility\" pillars",
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
                    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ["UsersThree", "Handshake", "Leaf"] } }),
                    defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
                  ],
                },
              ],
            }),
          ],
          preview: { prepare: () => ({ title: "Our responsibility (pillars)", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "responsibilityBand",
          title: "\"Our responsibility\" statement band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "quote", title: "Pull quote", type: "string" }),
          ],
          preview: { prepare: () => ({ title: "Our responsibility", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "impactBand",
          title: "\"Our impact\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { prepare: () => ({ title: "Our impact", subtitle: "Section" }) },
        },
      ],
    }),
  ],
  preview: { prepare() { return { title: "CSR page" }; } },
});
