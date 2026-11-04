import { defineField, defineType } from "sanity";

// Nov 2026: matches VALUES in src/components/values-section.tsx - the
// Home page's "What drives us" dark band (Excellence/Innovation/
// Consistency/Agility/Collaboration). Renamed `description` -> `body` and
// added `icon`/`tone` to match that component's exact fields.
export default defineType({
  name: "valuePillar",
  title: "Value pillar (Home - What drives us)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Sparkle", value: "Sparkle" },
          { title: "Lightbulb", value: "Lightbulb" },
          { title: "Check circle", value: "CheckCircle" },
          { title: "Lightning", value: "Lightning" },
          { title: "Users (three)", value: "UsersThree" },
        ],
      },
    }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: { list: ["gold", "green", "olive"] },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "body" } },
});
