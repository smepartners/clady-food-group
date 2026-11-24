import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/about/page.tsx. SECTORS
// (Retail/Cafés/Food service/Hospitality, fixed-icon, rarely changes) is
// left as code rather than modelled here; ACCREDITATIONS is its own
// repeatable `accreditation` type instead, since it's reused in the
// Studio desk the same way facilities/produce categories are.
//
// Rebuilt Nov 2026 (George: "make it so we can reorder sections from
// pages") - every block on the page, including the ones that were
// previously fully hardcoded in page.tsx (the "Hear it from us" video
// story, the "At a glance" sectors grid, the accreditations band, and
// the closing "Want to know more?" CTA, which had no Sanity field at
// all), now lives in one `sections` array so the whole page can be
// dragged into any order. The marker blocks (videoStoryBlock,
// sectorsBlock, accreditationsBlock, closingCtaBlock) carry only a
// `hidden` field - their content stays hardcoded JSX/other repeatable
// types, they exist purely so their position is part of the same
// reorderable list.
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
      name: "sections",
      title: "Page sections",
      description: "Add, remove, reorder and hide sections to build the page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "portfolioBand",
          title: "\"Today, our portfolio spans...\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "paragraphs", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
          ],
          preview: { prepare: () => ({ title: "Today, our portfolio spans...", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "heritageBand",
          title: "\"From family business to group\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "paragraphs", title: "Body paragraphs", description: "The first paragraph renders as a large italic pull-quote; the rest follow as normal body text.", type: "array", of: [{ type: "text", rows: 3 }] }),
          ],
          preview: { prepare: () => ({ title: "From family business to group", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "videoStoryBlock",
          title: "\"Hear it from us\" video",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "Hear it from us (video)", subtitle: "Fixed section" }) },
        },
        {
          type: "object",
          name: "howWeWorkBand",
          title: "\"How we work\" band",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site without deleting its content.", type: "boolean", initialValue: false }),
            defineField({ name: "paragraphs", title: "Body paragraphs", description: "The last paragraph renders as a large italic pull-quote; the rest come before it as normal body text.", type: "array", of: [{ type: "text", rows: 3 }] }),
          ],
          preview: { prepare: () => ({ title: "How we work", subtitle: "Section" }) },
        },
        {
          type: "object",
          name: "sectorsBlock",
          title: "\"At a glance\" sectors grid",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "At a glance (sectors)", subtitle: "Fixed section" }) },
        },
        {
          type: "object",
          name: "accreditationsBlock",
          title: "Accreditations",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "Accreditations", subtitle: "Fixed section - edit under Content library" }) },
        },
        {
          type: "object",
          name: "closingCtaBlock",
          title: "\"Want to know more?\" closing CTA",
          fields: [
            defineField({ name: "hidden", title: "Hide this section", description: "Temporarily hide this section from the live site.", type: "boolean", initialValue: false }),
          ],
          preview: { prepare: () => ({ title: "Want to know more? (closing CTA)", subtitle: "Fixed section" }) },
        },
      ],
    }),
  ],
  preview: { prepare() { return { title: "About page" }; } },
});
