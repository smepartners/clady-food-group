import { defineField, defineType } from "sanity";

// Nov 2026: rewritten to match GREEN_CREDENTIALS in
// src/app/(site)/csr/page.tsx (CSR page's "Carbon neutral" / "Solar-
// powered manufacturing" cards) - renamed title/description -> name/body
// and swapped the icon upload for a controlled list, since the page uses
// Phosphor icon components rather than uploaded images.
export default defineType({
  name: "csrInitiative",
  title: "Green credential (CSR page)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Cloud check (carbon neutral)", value: "CloudCheck" },
          { title: "Sun over horizon (solar)", value: "SunHorizon" },
        ],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "body" } },
});
