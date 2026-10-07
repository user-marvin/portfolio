import { cache } from "react";
import { localContent } from "@/data/resume";
import { client } from "./client";
import { siteContentQuery } from "./queries";
import type { SiteContent } from "./types";

type Nullable<T> = { [K in keyof T]: T[K] | null };

// Pages refresh from Sanity at most once a minute, or immediately via the /api/revalidate webhook.
const REVALIDATE_SECONDS = 60;

export const getContent = cache(async (): Promise<SiteContent> => {
  if (!client) return localContent;

  try {
    const remote = await client.fetch<Nullable<SiteContent>>(
      siteContentQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] } },
    );

    // Any section not yet created in Sanity keeps using the local copy.
    return {
      profile: remote.profile
        ? { ...remote.profile, resumeUrl: remote.profile.resumeUrl ?? localContent.profile.resumeUrl }
        : localContent.profile,
      featuredWork: remote.featuredWork ?? localContent.featuredWork,
      experience: remote.experience ?? localContent.experience,
      projects: remote.projects ?? localContent.projects,
      skills: remote.skills ?? localContent.skills,
      education: remote.education ?? localContent.education,
    };
  } catch (error) {
    console.error("Failed to load content from Sanity; using local content.", error);
    return localContent;
  }
});
