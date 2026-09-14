import { defineField, defineType } from "sanity";

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
    defineField({ name: "strapline", title: "Strapline", type: "string" }),
    defineField({
      name: "bodyBlocks",
      title: "Body content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "focusTags",
      title: "Focus tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "accentColour",
      title: "Accent colour",
      type: "string",
      description: "Hex value used for this brand's page (falls back to group palette if empty)",
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "strapline", media: "logo" },
  },
});
