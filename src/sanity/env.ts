export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-10-01";

// The site falls back to local content in src/data/resume.ts until a project ID is set.
export const isSanityConfigured = projectId.length > 0;
