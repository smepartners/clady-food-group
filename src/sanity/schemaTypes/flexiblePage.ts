import { defineField, defineType } from "sanity";

// New (Nov 2026) - the generic "build your own page" type requested by
// George/Discoverable so the client isn't blocked on a developer for
// every new page. Unlike homePage/aboutPage/privateLabelPage/csrPage/
// contactPage/whiteLabelCoffeePage (one bespoke schema + one bespoke
// Next.js route each, see the comment on schemaTypes/index.ts), this is
// a single repeatable type: the client creates a new document, gives it
// a title/slug, and assembles the page from a fixed library of section
// "blocks" (see flexible-blocks.tsx for how each renders) - this is what
// answers "can the client create new pages and pick from templates" from
// the Nov 2026 conversation with George. Every block also carries its
// own `hidden` toggle, same as the section-level toggle added to the
// bespoke pages, so a block can be taken off the live page without
// deleting its content.
//
// Reserved slugs are blocked in validation below since those paths are
// already bespoke routes - a flexiblePage using one of those slugs would
// never actually be reachable (the static route always wins).
const RESERVED_SLUGS = ["about", "csr", "contact", "brands", "private-label", "studio", "api", ""];

// Dark-green bands are a deliberate, occasional moment (see the real
// site's CSR/Private Label pages) rather than a background choice on
// every block, so only the CTA block below offers one (via its own
// `style` field) - these five content blocks stay light.
const TONE_OPTIONS = { list: ["white", "cream"] };

export default defineType({
  name: "flexiblePage",
  title: "Page (build your own)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      validation: (r) =>
        r.required().custom((value) => {
          const current = value?.current;
          if (current && RESERVED_SLUGS.includes(current)) {
            return `"/${current}" is already used by an existing page - choose a different URL.`;
          }
          return true;
        }),
    }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 2 }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
        defineField({ name: "image", title: "Background photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA button link", type: "string", description: "e.g. /contact" }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description: "Add, remove, reorder and hide sections to build the page. Pick a section type each time you add one.",
      type: "array",
      of: [
        {
          type: "object",
          name: "textImageBlock",
          title: "Text + photo",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
            defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
            defineField({ name: "imagePosition", title: "Photo position", type: "string", options: { list: ["left", "right"] }, initialValue: "right" }),
            defineField({ name: "tone", title: "Background", type: "string", options: TONE_OPTIONS, initialValue: "white" }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Text + photo", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "iconGridBlock",
          title: "Icon grid (features/sectors/services)",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "tone", title: "Background", type: "string", options: TONE_OPTIONS, initialValue: "cream" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "gridItem",
                  fields: [
                    defineField({ name: "name", title: "Name", type: "string" }),
                    defineField({ name: "body", title: "Body", type: "string" }),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          "Storefront", "Coffee", "ForkKnife", "Rocket", "Gift", "Package",
                          "ChartLineUp", "Lightning", "CheckCircle", "UsersThree", "Leaf",
                          "Handshake", "Buildings", "CalendarBlank",
                        ],
                      },
                    }),
                    defineField({ name: "tone", title: "Icon tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Icon grid", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "statsBlock",
          title: "Stats row",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "tone", title: "Background", type: "string", options: TONE_OPTIONS, initialValue: "white" }),
            defineField({
              name: "items",
              title: "Stats",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "statItem",
                  fields: [
                    defineField({ name: "value", title: "Value", type: "string" }),
                    defineField({ name: "label", title: "Label", type: "string" }),
                  ],
                },
              ],
            }),
          ],
          preview: { prepare: () => ({ title: "Stats row", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "cardsBlock",
          title: "Cards (two or more)",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "tone", title: "Background", type: "string", options: TONE_OPTIONS, initialValue: "cream" }),
            defineField({
              name: "cards",
              title: "Cards",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "card",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Cards", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "pillsBlock",
          title: "Pill list (formats/options/tags)",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "pills", title: "Items", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "note", title: "Note", type: "string" }),
            defineField({ name: "tone", title: "Background", type: "string", options: TONE_OPTIONS, initialValue: "white" }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Pill list", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "texturedCtaBlock",
          title: "Textured CTA band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
            defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
            defineField({ name: "ctaHref", title: "CTA button link", type: "string", description: "e.g. /contact" }),
            defineField({
              name: "style",
              title: "Style",
              type: "string",
              options: { list: [{ title: "Green with gold texture", value: "gold-texture" }, { title: "Green, plain", value: "plain" }] },
              initialValue: "plain",
            }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Textured CTA band", subtitle: "Section" }) },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle}` : "No URL set" }),
  },
});
