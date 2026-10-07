import { defineArrayMember, defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons/Star";

export const featuredWork = defineType({
  name: "featuredWork",
  title: "Featured work",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "show", title: "Show this section", type: "boolean", initialValue: true }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 4 }),
    defineField({
      name: "tiers",
      title: "Diagram steps",
      description: "Shown left to right as a flow. Four works best.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tier",
          fields: [
            defineField({ name: "label", title: "Short label", type: "string" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "items", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "delivery",
      title: "Delivery pipeline",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "outcomes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "outcome",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
});
