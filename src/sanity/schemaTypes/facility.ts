import { defineField, defineType } from "sanity";

// New (Nov 2026). Matches src/lib/facilities.ts's FACILITIES array
// ([{name, region}]) - the two manufacturing sites shown on Home/About/
// Private Label (Buxton, Belfast).
export default defineType({
  name: "facility",
  title: "Manufacturing facility",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "region", title: "Region", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "region" },
  },
});
