import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/private-label/coffee/page.tsx.
// Split out of the "White label copy" brief Zoe/Sonia supplied - keyword
// research (DiscoQuery, UK, checked 19 Nov 2026) found real search volume
// for white label/own label coffee terms, but none for "white label
// powdered drinks", "formats we pack into" or "innovation and blend
// development" on their own, so those three are folded into this page as
// sections rather than built as separate pages (see the sections below
// and the research doc for the full reasoning). SCALE_STATS reuses the
// shared `stat` documents, same as privateLabelPage.
export default defineType({
  name: "whiteLabelCoffeePage",
  title: "White Label Coffee page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
        defineField({ name: "image", title: "Background photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
      ],
    }),
    defineField({
      name: "introSection",
      title: "Intro ('We source, roast, blend and pack...')",
      type: "object",
      fields: [
        defineField({
          name: "hidden",
          title: "Hide this section",
          description: "Temporarily hide this section from the live site without deleting its content.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "sectorsSection",
      title: "'Who we supply' sectors",
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
        defineField({
          name: "sectors",
          title: "Sectors",
          type: "array",
          of: [
            {
              type: "object",
              name: "sector",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "body", title: "Body", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ["Storefront", "Coffee", "ForkKnife", "Rocket", "Gift"] },
                }),
                defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["gold", "green", "olive"] } }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "offerSection",
      title: "'What we can offer'",
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
        defineField({ name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "howItWorksSection",
      title: "'How it works' steps",
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
        defineField({ name: "intro", title: "Intro line", type: "string" }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              name: "step",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "innovationSection",
      title: "Innovation & blend development (folded in)",
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
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "innovationCard",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "formatsSection",
      title: "Formats we pack into (folded in)",
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
        defineField({ name: "formats", title: "Formats", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "note", title: "Note", type: "string" }),
      ],
    }),
    defineField({
      name: "crossSellSection",
      title: "Cross-sell to powdered drinks (folded in)",
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
        defineField({ name: "linkLabel", title: "Link label", type: "string" }),
        defineField({ name: "href", title: "Link URL", type: "string", description: "Where 'powdered drinks' lives once that page/section exists." }),
      ],
    }),
    defineField({
      name: "closingCta",
      title: "Closing CTA band",
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
        defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string" }),
      ],
    }),
  ],
  preview: { prepare() { return { title: "White Label Coffee page" }; } },
});
