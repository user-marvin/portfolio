import { defineArrayMember, defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "jobs",
      description: "Drag to reorder. The first job is selected by default.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "job",
          fields: [
            defineField({ name: "company", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "period", type: "string", description: "e.g. Sep 2025 — Present", validation: (r) => r.required() }),
            defineField({ name: "mode", title: "Work mode", type: "string", description: "e.g. Fully remote, Onsite, Hybrid" }),
            defineField({ name: "project", title: "Project / team", type: "string" }),
            defineField({ name: "highlights", type: "array", of: [{ type: "text", rows: 2 }] }),
            defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
          ],
          preview: { select: { title: "company", subtitle: "period" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Experience" }) },
});
