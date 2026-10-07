import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons/Book";

export const education = defineType({
  name: "education",
  title: "Education & certifications",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "entries",
      title: "Education",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "educationEntry",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "org", title: "School / organization", type: "string" }),
            defineField({ name: "period", type: "string" }),
            defineField({ name: "note", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "org" } },
        }),
      ],
    }),
    defineField({ name: "certifications", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { prepare: () => ({ title: "Education & certifications" }) },
});
