import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            { name: "heading", type: "string" },
            { name: "body", type: "array", of: [{ type: "block" }] },
          ],
        },
      ],
    }),
    defineField({
      name: "seoMeta",
      title: "SEO meta",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string" },
        { name: "metaDescription", type: "text" },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
