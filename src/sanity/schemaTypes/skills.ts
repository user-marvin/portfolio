import { defineArrayMember, defineField, defineType } from "sanity";
import { CodeIcon } from "@sanity/icons/Code";

export const skills = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "skillGroup",
          fields: [
            defineField({ name: "group", title: "Group name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "items", title: "Skills", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
          ],
          preview: { select: { title: "group" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Skills" }) },
});
