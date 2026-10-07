"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletons } from "./src/sanity/schemaTypes";

const singletonTypes = new Set<string>(singletons.map((s) => s.type));

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio")
          .items(
            singletons.map((s) =>
              S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type).title(s.title)),
            ),
          ),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Sections are fixed documents, so hide them from "Create new".
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
