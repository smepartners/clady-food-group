import { defineField, defineType } from "sanity";

// New (Nov 2026). Matches ACCREDITATIONS in src/app/(site)/about/page.tsx
// - the group-wide accreditations (Rainforest Alliance, Fairtrade, BRCGS
// Start Basic). Site-specific certifications (e.g. Slumberjack's own
// BRCGS mark) live on the `brand` document's `certification` field
// instead - see the note there.
export default defineType({
  name: "accreditation",
  title: "Accreditation",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", title: "Note", type: "string" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "note", media: "logo" },
  },
});
