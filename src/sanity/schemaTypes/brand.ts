import { defineField, defineType } from "sanity";

// Rewritten (Nov 2026) to match the real `Brand` shape in
// src/app/(site)/brands/[slug]/page.tsx - the original scaffold's fields
// (strapline, bodyBlocks portable text, focusTags as a tag array,
// accentColour) didn't match anything the live site actually renders.
// Every field below is named and shaped to swap in directly for that
// page's `BRANDS` map once the page is switched over to fetch from Sanity.
export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "strap",
      title: "Strapline",
      type: "string",
      description: "Short one-line strap shown under the brand name (e.g. \"Convenience made simple.\")",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "focus",
      title: "Focus areas",
      type: "string",
      description:
        "Plain text, separated by · (e.g. \"Instant coffee · Hot chocolate · Milk & whitener\") - rendered as a row of clickable pills on the brand page.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Each entry is one paragraph, rendered in order.",
      validation: (r) => r.min(1).required(),
    }),
    defineField({
      name: "photo",
      title: "Brand photo",
      type: "image",
      options: { hotspot: true },
      description: "Hero/background image for this brand's page and its card in the brand grid/carousel.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "productsImage",
      title: "Product range photo",
      type: "image",
      options: { hotspot: true },
      description: "Optional - a real product-range shot shown beside the overview copy.",
    }),
    defineField({
      name: "productsImageAlt",
      title: "Product range photo alt text",
      type: "string",
      hidden: ({ document }) => !document?.productsImage,
    }),
    defineField({
      name: "social",
      title: "Social & website links",
      type: "object",
      fields: [
        defineField({ name: "website", title: "Website", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
      ],
    }),
    defineField({
      name: "websiteComingSoon",
      title: "Show \"website coming soon\" instead of social icons",
      type: "boolean",
      initialValue: false,
      description: "Turn on when no social/website links are confirmed yet for this brand.",
    }),
    defineField({
      name: "certification",
      title: "Certification (site-specific, not group-wide)",
      type: "object",
      description:
        "A third-party certification tied to this brand's own entity/site rather than the group as a whole (e.g. Slumberjack's BRCGS Start mark). Group-wide accreditations live on the accreditation document type instead.",
      fields: [
        defineField({ name: "logo", title: "Certification mark", type: "image" }),
        defineField({ name: "logoAlt", title: "Certification mark alt text", type: "string" }),
        defineField({ name: "body", title: "Certification description", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email (this brand)",
      type: "string",
      description:
        "Overrides the group-wide contact email when a visitor clicks \"Get in touch about\" this brand - e.g. dutchmaid@cladyfoodgroup.com. Leave blank to use the group default from Site settings.",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone (this brand)",
      type: "string",
      description:
        "Overrides the group-wide contact phone number when a visitor clicks \"Get in touch about\" this brand. Leave blank to use the group default from Site settings.",
    }),
    defineField({
      name: "seed",
      title: "Placeholder image seed",
      type: "string",
      description:
        "Technical field - only used as a fallback placeholder-image seed if no real photo is set. Not shown on the page.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Controls display order in the brand grid/carousel.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "strap", media: "logo" },
  },
});
