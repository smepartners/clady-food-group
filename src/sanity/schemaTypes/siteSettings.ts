import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton - only one document of this type should exist.
  // Enforce this in the Studio structure (see src/sanity/structure.ts).
  fields: [
    defineField({
      name: "nav",
      title: "Navigation links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        { name: "companyName", type: "string" },
        { name: "companyNumber", type: "string" },
        { name: "registeredAddress", type: "text" },
      ],
    }),
    defineField({
      name: "contactDetails",
      title: "Contact details",
      type: "object",
      fields: [
        { name: "email", type: "string" },
        { name: "phone", type: "string" },
        { name: "address", type: "text" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
