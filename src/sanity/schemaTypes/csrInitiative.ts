import { defineField, defineType } from "sanity";

export default defineType({
  name: "csrInitiative",
  title: "CSR initiative (Our impact)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "icon", title: "Icon", type: "image" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
