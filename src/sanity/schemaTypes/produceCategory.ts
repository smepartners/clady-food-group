import { defineField, defineType } from "sanity";

// New (Nov 2026). Matches PRODUCE_CATEGORIES in
// src/app/(site)/private-label/page.tsx ("What we produce" grid: Coffee,
// Powdered drinks, Functional drinks, Tea). `icon` is a controlled list
// rather than an upload, since the live page uses Phosphor icon
// components, not images - the page code maps this string to the
// matching <Icon> component.
export default defineType({
  name: "produceCategory",
  title: "Produce category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Coffee", value: "Coffee" },
          { title: "Drop", value: "Drop" },
          { title: "Lightning", value: "Lightning" },
          { title: "Tea bag", value: "TeaBag" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seed",
      title: "Placeholder image seed",
      type: "string",
      description: "Technical field - fallback placeholder-image seed, not shown on the page.",
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
