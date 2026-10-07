import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "items",
      title: "Projects",
      description: "Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "project",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "year", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "string" })] }),
            defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
            defineField({
              name: "links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "link",
                  fields: [
                    defineField({ name: "label", type: "string", description: "e.g. Live site, Source", validation: (r) => r.required() }),
                    defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "year", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "showMoreCard", title: "Show “More on the way” card", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Projects" }) },
});
