import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const profile = defineType({
  name: "profile",
  title: "Profile & Hero",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "contact", title: "Contact & links" },
  ],
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "shortName", title: "Display name", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / title", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", group: "hero" }),
    defineField({ name: "headline", type: "text", rows: 3, group: "hero", validation: (r) => r.required() }),
    defineField({
      name: "currently",
      title: "Currently building",
      description: "Shown after the headline, e.g. “SmartFleet for Royal Caribbean Group”. Leave empty to hide.",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "stats",
      title: "Headline numbers",
      type: "array",
      group: "hero",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "About paragraphs",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "principles",
      title: "How I work",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "email", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({ name: "github", title: "GitHub URL", type: "url", group: "contact" }),
    defineField({
      name: "resumeFile",
      title: "Résumé PDF",
      type: "file",
      group: "contact",
      options: { accept: "application/pdf" },
    }),
    defineField({ name: "contactBlurb", title: "Contact text", type: "text", rows: 3, group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Profile & Hero" }) },
});
