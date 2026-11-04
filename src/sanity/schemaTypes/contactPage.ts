import { defineField, defineType } from "sanity";

// New (Nov 2026) singleton for src/app/(site)/contact/page.tsx. Email/
// phone are already modelled on `siteSettings.contactDetails` and are
// read from there (not duplicated here) since the footer uses the same
// values. This covers only this page's own hero copy.
export default defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "emailPrompt",
      title: "\"Prefer email?\" prompt text",
      type: "string",
      description: "e.g. \"Prefer email? Reach us directly at\" - the email address itself comes from Site settings.",
    }),
  ],
  preview: { prepare() { return { title: "Contact page" }; } },
});
