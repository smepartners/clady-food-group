import { defineField, defineType } from "sanity";

// Nov 2026: this is the one shared set of group scale stats ("12+ years
// established", "2 manufacturing sites", "100s of brands produced") -
// per the comment on SCALE_STATS in private-label/page.tsx, the same
// confirmed facts are reused verbatim across Home, About and Private
// Label, so a single set of stat documents (not one per page) backs all
// three. Added `icon` to match the Phosphor icon each stat renders with
// on every one of those pages.
export default defineType({
  name: "stat",
  title: "Group scale stat",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Calendar (years established)", value: "CalendarBlank" },
          { title: "Buildings (sites)", value: "Buildings" },
          { title: "Package (brands)", value: "Package" },
        ],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
