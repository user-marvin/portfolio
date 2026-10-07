export type Stat = { value: string; label: string };
export type TitledText = { title: string; body?: string };

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  location?: string;
  headline: string;
  currently?: string;
  stats: Stat[];
  summary: string[];
  principles: TitledText[];
  email: string;
  github?: string;
  resumeUrl?: string;
  contactBlurb?: string;
};

export type FeaturedWork = {
  show: boolean;
  title: string;
  intro?: string;
  tiers: { label?: string; title: string; items: string[] }[];
  delivery: string[];
  outcomes: TitledText[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  mode?: string;
  project?: string;
  highlights: string[];
  stack: string[];
};

export type Project = {
  title: string;
  year?: string;
  description: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  stack: string[];
  links: { label: string; href: string }[];
};

export type SkillGroup = { group: string; items: string[] };

export type EducationEntry = { title: string; org?: string; period?: string; note?: string };

export type SiteContent = {
  profile: Profile;
  featuredWork: FeaturedWork;
  experience: Job[];
  projects: { items: Project[]; showMoreCard: boolean };
  skills: SkillGroup[];
  education: { entries: EducationEntry[]; certifications: string[] };
};
