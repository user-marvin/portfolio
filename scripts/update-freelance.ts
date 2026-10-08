/**
 * Replaces the Freelance job in the Experience document with the entry below.
 *
 *   TARGET_DATASET=development npx sanity exec scripts/update-freelance.ts --with-user-token
 *
 * The dataset must be named explicitly so production is only changed on purpose.
 */
import { getCliClient } from "sanity/cli";

const dataset = process.env.TARGET_DATASET;
if (!dataset) {
  console.error("Set TARGET_DATASET (e.g. development or production).");
  process.exit(1);
}

const client = getCliClient({ apiVersion: "2025-10-01" }).withConfig({ dataset });

const freelance = {
  company: "Freelance",
  role: "Software Engineer / Full Stack Developer",
  period: "Jan 2025 — Jul 2025",
  mode: "Fully remote",
  project: "Telecom & IoT monitoring platform",
  highlights: [
    "Built features across both tiers of a telecom and IoT monitoring platform: a React 18 + TypeScript single-page app in an Nx monorepo and a NestJS REST API backed by MySQL.",
    "Developed a NestJS backend-for-frontend that puts 5 monitoring APIs (IoT, metering, telecom, alarms, notifications) behind one authenticated API, with 22 TypeORM entities, validated DTOs, Swagger docs, and scheduled jobs.",
    "Secured the API with JWT, API-key, and role-based access guards, and worked on moving login to Keycloak SSO with RS256 tokens verified against the realm's public keys.",
    "Built real-time monitoring dashboards and widgets with Highcharts, AG Grid, and kepler.gl / Leaflet maps, helping users read large datasets from devices and network KPIs across regions.",
    "Delivered admin tools for KPIs, thresholds, users, and vendors using Redux, 9 shared Nx UI libraries, and 2-language (English/Spanish) localization with react-intl.",
    "Built a react-native-cli mobile app as a counterpart to the web app, tailoring existing NestJS services to cut unnecessary data loads.",
    "Shipped through GitLab CI with SonarQube, SAST, and dependency scanning, deploying Docker images to the client's servers.",
  ],
  stack: [
    "React 18",
    "TypeScript",
    "NestJS",
    "MySQL",
    "TypeORM",
    "Redux",
    "Nx",
    "Highcharts",
    "AG Grid",
    "kepler.gl",
    "Keycloak",
    "React Native",
    "Docker",
  ],
};

async function main() {
  const doc = await client.getDocument<{ _id: string; jobs?: { _key: string; company: string }[] }>("experience");
  const job = doc?.jobs?.find((j) => j.company === "Freelance");
  if (!job) throw new Error(`No Freelance job found in the "${dataset}" dataset.`);

  await client
    .patch("experience")
    .set({ [`jobs[_key=="${job._key}"]`]: { _key: job._key, _type: "job", ...freelance } })
    .commit();
  console.log(`Updated the Freelance job in "${dataset}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
