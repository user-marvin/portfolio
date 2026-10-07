import { education } from "./education";
import { experience } from "./experience";
import { featuredWork } from "./featuredWork";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";

export const schemaTypes = [profile, featuredWork, experience, projects, skills, education];

// One document per section; each is edited in place rather than created or deleted.
export const singletons = [
  { type: "profile", title: "Profile & Hero" },
  { type: "featuredWork", title: "Featured work" },
  { type: "experience", title: "Experience" },
  { type: "projects", title: "Projects" },
  { type: "skills", title: "Skills" },
  { type: "education", title: "Education & certifications" },
] as const;
