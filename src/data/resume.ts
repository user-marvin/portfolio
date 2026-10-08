import type { EducationEntry, FeaturedWork, Job, Profile, Project, SiteContent, SkillGroup } from "@/sanity/types";

// Local copy of the site content. It is used when Sanity isn't configured (or a section is
// empty there), and it is what `npm run sanity:seed` uploads to Sanity the first time.

const profile: Profile = {
  name: "Marvin B. Villamar",
  shortName: "Marvin Villamar",
  role: "AI Engineer & Full Stack Developer",
  location: "Quezon City, Metro Manila, PH",
  headline:
    "I build production web, mobile, and reactive backend systems — and use generative AI and AI-assisted development to design, build, and ship them faster.",
  currently: "SmartFleet for Royal Caribbean Group",
  stats: [
    { value: "4+", label: "years shipping production software" },
    { value: "71", label: "ships running code I maintain" },
    { value: "10+", label: "enterprise systems behind one reactive API" },
    { value: "3", label: "industries: cruise, insurance, IoT" },
  ],
  summary: [
    "AI engineer and full stack developer with 4+ years of experience across cruise hospitality, insurance, telecom, and IoT. Right now I build and maintain both tiers of a crew-facing guest experience platform that runs on every ship in Royal Caribbean Group's 71-vessel fleet.",
    "I'm comfortable owning a feature end to end, and I'm known for modernizing legacy stacks — monolith to microservices, blocking to reactive, and outdated libraries to maintainable ones.",
    "I work hands-on with generative AI and AI-assisted development, using tools like Claude Code, GitHub Copilot, and Cursor across design, coding, testing, and code review.",
  ],
  principles: [
    { title: "End-to-end ownership", body: "API design and data modeling through UI, test coverage, and Docker/ArgoCD delivery." },
    { title: "Modernizing legacy", body: "Monolith to microservices, blocking to reactive, outdated libraries to maintainable ones." },
    { title: "Resilient by default", body: "Retries, timeouts, offline tolerance, and coverage gates on every release." },
    {
      title: "AI-assisted engineering",
      body: "Generative AI and tools like Claude Code, Copilot, and Cursor in everyday design, coding, testing, and review.",
    },
  ],
  email: "villamar.marvin.b.8138@gmail.com",
  github: "https://github.com/user-marvin",
  resumeUrl: "/Marvin-Villamar-Resume.pdf",
  contactBlurb:
    "I'm open to full stack and backend roles, contract work, and interesting problems. The fastest way to reach me is email.",
};

const featuredWork: FeaturedWork = {
  show: true,
  title: "SmartFleet — Royal Caribbean Group",
  intro:
    "A crew-facing guest experience platform used daily on every ship in a 71-vessel fleet. I build and maintain both tiers: the Next.js web app and the reactive Spring API that aggregates 10+ enterprise systems.",
  tiers: [
    { label: "Users", title: "Crew & shore managers", items: ["Crew on 71 ships", "Shore-side managers", "Royal Caribbean", "Celebrity"] },
    { label: "Web", title: "Brand-aware Next.js app", items: ["Next.js 16", "React 19", "TanStack Query", "Zustand"] },
    { label: "API", title: "Reactive aggregation layer", items: ["Java 21", "Spring Boot 4", "WebFlux", "Retry · timeout · backoff"] },
    {
      label: "Upstream",
      title: "10+ enterprise systems",
      items: ["Tibco PMS", "Oracle", "ForgeRock SSO", "Couchbase", "Hazelcast", "Guest360", "Asset Tracking"],
    },
  ],
  delivery: ["Docker", "ArgoCD GitOps", "OpenShift ship-edge", "AWS"],
  outcomes: [
    { title: "Two brands, one codebase", body: "Royal Caribbean and Celebrity served from one brand-aware shell, so one team ships to both fleets at once." },
    { title: "No single point of failure", body: "Non-blocking WebClient pipelines with retry, timeout, and backoff isolate crew from upstream outages." },
    { title: "Edits that survive change", body: "Schema-versioned Couchbase persistence with migration-safe merges and daily voyage rollover seeding." },
    { title: "Works at sea", body: "Offline-tolerant behavior across satellite dropouts and automatic chunk-load recovery at the ship edge." },
  ],
};

const experience: Job[] = [
  {
    company: "Royal Caribbean Group",
    role: "Software Engineer / Full Stack Developer",
    period: "Sep 2025 — Present",
    project: "SmartFleet Guest Experience Platform · via Vertere Global Solutions",
    mode: "Fully remote",
    stack: ["Next.js 16", "React 19", "TypeScript", "Java 21", "Spring Boot 4", "WebFlux", "Couchbase", "ArgoCD"],
    highlights: [
      "Build and maintain both tiers of SmartFleet, the crew-facing guest experience platform used daily on every ship in the 71-vessel fleet and by shore-side managers.",
      "Delivered a brand-aware single codebase serving Royal Caribbean and Celebrity from one shell (Tailwind, Material UI, TanStack Query, Zustand) — one team ships a feature to both fleets at once.",
      "Aggregated 10+ enterprise systems (Tibco PMS, Oracle, ForgeRock SSO, Couchbase, Hazelcast, Guest360, Asset Tracking) behind non-blocking WebClient pipelines with retry, timeout, and backoff.",
      "Implemented schema-versioned Couchbase persistence with migration-safe merges and daily voyage rollover seeding, so crew edits survive refactors and voyage transitions.",
      "Secured the platform with ForgeRock OpenAM SSO and JWT sessions mapped to LDAP role claims, plus role-based UI gating, a custom feature-flag layer, and admin role impersonation.",
      "Engineered for ship-edge resilience: offline-tolerant behavior across satellite dropouts, automatic chunk-load recovery, and server-side proxies fronting an embedded micro-frontend.",
      "Safeguarded releases with Jest, RTL, Playwright, JUnit, Reactor Test, and WireMock, gated by SonarQube and JaCoCo coverage plus Snyk CVE remediation.",
      "Delivered through multi-stage Docker images and ArgoCD GitOps to OpenShift ship-edge and AWS clusters from one image with environment-scoped config.",
    ],
  },
  {
    company: "Freelance",
    role: "Software Engineer / Full Stack Developer",
    period: "Jan 2025 — Jul 2025",
    project: "Telecom & IoT monitoring platform",
    mode: "Fully remote",
    stack: ["React 18", "TypeScript", "NestJS", "MySQL", "TypeORM", "Redux", "Nx", "Highcharts", "AG Grid", "kepler.gl", "Keycloak", "React Native", "Docker"],
    highlights: [
      "Built features across both tiers of a telecom and IoT monitoring platform: a React 18 + TypeScript single-page app in an Nx monorepo and a NestJS REST API backed by MySQL.",
      "Developed a NestJS backend-for-frontend that puts 5 monitoring APIs (IoT, metering, telecom, alarms, notifications) behind one authenticated API, with 22 TypeORM entities, validated DTOs, Swagger docs, and scheduled jobs.",
      "Secured the API with JWT, API-key, and role-based access guards, and worked on moving login to Keycloak SSO with RS256 tokens verified against the realm's public keys.",
      "Built real-time monitoring dashboards and widgets with Highcharts, AG Grid, and kepler.gl / Leaflet maps, helping users read large datasets from devices and network KPIs across regions.",
      "Delivered admin tools for KPIs, thresholds, users, and vendors using Redux, 9 shared Nx UI libraries, and 2-language (English/Spanish) localization with react-intl.",
      "Built a react-native-cli mobile app as a counterpart to the web app, tailoring existing NestJS services to cut unnecessary data loads.",
      "Shipped through GitLab CI with SonarQube, SAST, and dependency scanning, deploying Docker images to the client's servers.",
    ],
  },
  {
    company: "IBM",
    role: "Application Developer",
    period: "Nov 2023 — Nov 2024",
    project: "Insurance Industry · UP Technohub, QC",
    mode: "Onsite",
    stack: ["React", "TypeScript", "Vue.js", "Spring Boot 3", "NestJS", "DB2", "MySQL", "MongoDB"],
    highlights: [
      "Developed responsive, high-performance web and mobile apps with React and TypeScript.",
      "Migrated a full-stack application from a monolith to microservices for scalability and maintainability.",
      "Moved a JSP/Java backend to Java EE 17, Spring Boot 3, REST, DB2, JPA, and Hibernate.",
      "Designed backend services in both NestJS and Spring Boot, managing large datasets across MySQL and MongoDB.",
      "Modernized UIs with Tailwind CSS, shadcn/ui, Material UI, and Vue.js + Vite to improve consistency and load times.",
      "Practiced test-driven development on every release, frontend and backend.",
    ],
  },
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    period: "Aug 2022 — Oct 2023",
    project: "CG 2 · Mandaluyong City",
    mode: "Hybrid",
    stack: ["React", "Redux", "Java", "REST", "Cucumber", "Selenium"],
    highlights: [
      "Built REST web services with a strong focus on clean, object-oriented code.",
      "Created React + Redux frontends integrated with company API services.",
      "Wrote and maintained API test automation in Cucumber and Java with Selenium and Postman.",
      "Completed a 2-month full stack (Java + React) bootcamp.",
    ],
  },
];

const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React 19", "Next.js (App Router)", "React Native", "Vue.js", "TypeScript", "TanStack Query", "Zustand", "Redux", "Pinia", "Tailwind CSS", "Material UI", "shadcn/ui", "Nx monorepos", "react-intl (i18n)"],
  },
  {
    group: "Backend",
    items: ["Java 21", "Spring Boot 4", "Spring WebFlux", "Project Reactor", "Node.js", "NestJS", "REST", "OAuth / JWT", "JPA / Hibernate", "Apache POI", "TypeORM", "Keycloak / SSO", "Swagger / OpenAPI"],
  },
  { group: "Data", items: ["Oracle", "MySQL", "DB2", "MongoDB", "Couchbase", "Hazelcast"] },
  { group: "Data Viz & Maps", items: ["Highcharts", "AG Grid", "kepler.gl", "Leaflet", "MapTiler"] },
  {
    group: "Cloud & Delivery",
    items: ["Docker", "OpenShift / Kubernetes", "ArgoCD (GitOps)", "AWS", "Google Cloud Run", "Firebase", "Vercel", "GitLab CI"],
  },
  {
    group: "Testing",
    items: ["JUnit", "Mockito", "Reactor Test", "WireMock", "Jest", "Playwright", "Selenium", "SonarQube"],
  },
  { group: "Observability", items: ["Splunk RUM", "OpenTelemetry", "Micrometer", "Log4j2"] },
  {
    group: "AI Engineering",
    items: ["Generative AI", "AI-Assisted Development", "Claude Code", "GitHub Copilot", "Cursor"],
  },
];

const educationEntries: EducationEntry[] = [
  {
    title: "BS Information Technology",
    org: "Bulacan State University",
    note: "Cum Laude",
    period: "2018 — 2022",
  },
  {
    title: "Frontend Developer Intern",
    org: "Accenture · project-based",
    note: "Built a faculty accomplishment report system with Django REST, React, and Redux.",
    period: "Mar — Jun 2022",
  },
];

const certifications = [
  "Microsoft Certified: Azure Fundamentals",
  "React — The Complete Guide (Hooks, Router, Redux) · Udemy",
  "Git Complete — The Definitive Guide · Udemy",
  "The Complete Web Developer: Zero to Mastery · Udemy",
];

const projects: Project[] = [
  {
    title: "Faculty Accomplishment Report System",
    description:
      "Web-based weekly accomplishment report management system for Bulacan State University's college faculty, built during a project-based internship with Accenture.",
    stack: ["React", "Redux", "Django REST", "Python", "SQLite"],
    year: "2022",
    links: [],
  },
];

export const localContent: SiteContent = {
  profile,
  featuredWork,
  experience,
  projects: { items: projects, showMoreCard: true },
  skills,
  education: { entries: educationEntries, certifications },
};
