import { defineField, defineType } from "sanity";

// New (Nov 2026, George: "form submissions on modal, make sure we store
// which brand is being enquired about") - every contact-form submission
// (the main Contact page, and each brand's contact popup - contact-
// form.tsx/brand-contact-modal.tsx) is still emailed via Resend as
// before (see src/app/api/contact/route.ts), but is now also written
// here as a document, so enquiries are visible and searchable in the
// Studio itself rather than living only in an inbox. `brand` is the
// field that answers George's ask directly - set whenever the enquiry
// came from a brand's own popup, left blank for the general Contact
// page. Written server-side only (route.ts, using the write token) -
// there is no "Create new" workflow for this type in normal use, it's a
// log, not editorial content.
export default defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({
      name: "brand",
      title: "Brand enquired about",
      type: "string",
      description: "Set automatically when this came from a brand page's contact popup. Blank means it came from the main Contact page.",
      readOnly: true,
    }),
    defineField({ name: "submittedAt", title: "Submitted", type: "datetime", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { name: "name", brand: "brand", email: "email", submittedAt: "submittedAt" },
    prepare: ({ name, brand, email, submittedAt }) => ({
      title: name || email || "Enquiry",
      subtitle: [
        brand || "General enquiry",
        submittedAt ? new Date(submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
