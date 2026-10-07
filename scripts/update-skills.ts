/**
 * Adds the freelance project's tech to the Skills document: extra items in existing groups
 * (skipping ones already listed) and a new "Data Viz & Maps" group after "Data".
 *
 *   TARGET_DATASET=development npx sanity exec scripts/update-skills.ts --with-user-token
 *
 * Safe to re-run; it never duplicates items or groups.
 */
import { getCliClient } from "sanity/cli";

const dataset = process.env.TARGET_DATASET;
if (!dataset) {
  console.error("Set TARGET_DATASET (e.g. development or production).");
  process.exit(1);
}

const client = getCliClient({ apiVersion: "2025-10-01" }).withConfig({ dataset });

const additions: Record<string, string[]> = {
  Frontend: ["Nx monorepos", "react-intl (i18n)"],
  Backend: ["TypeORM", "Keycloak / SSO", "Swagger / OpenAPI"],
  "Cloud & Delivery": ["GitLab CI"],
};

const newGroup = {
  group: "Data Viz & Maps",
  items: ["Highcharts", "AG Grid", "kepler.gl", "Leaflet", "MapTiler"],
  after: "Data",
};

type Group = { _key: string; _type?: string; group: string; items?: string[] };

async function main() {
  const doc = await client.getDocument<{ groups?: Group[] }>("skills");
  if (!doc?.groups) throw new Error(`No skills document in "${dataset}".`);

  const groups = doc.groups.map((g) => {
    const extra = (additions[g.group] ?? []).filter((item) => !g.items?.includes(item));
    return extra.length ? { ...g, items: [...(g.items ?? []), ...extra] } : g;
  });

  if (!groups.some((g) => g.group === newGroup.group)) {
    const at = groups.findIndex((g) => g.group === newGroup.after) + 1 || groups.length;
    groups.splice(at, 0, {
      _key: `viz${Math.random().toString(36).slice(2, 8)}`,
      _type: "skillGroup",
      group: newGroup.group,
      items: newGroup.items,
    });
  }

  await client.patch("skills").set({ groups }).commit();
  console.log(`Updated skills in "${dataset}":`);
  groups.forEach((g) => console.log(`  ${g.group}: ${g.items?.join(", ")}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
