import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Stat (About - at a glance)",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
