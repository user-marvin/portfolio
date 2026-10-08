/**
 * Retitles the profile as "AI Engineer & Full Stack Developer" and adds general AI wording to the
 * headline, About, "How I work", and the AI skills group.
 *
 *   TARGET_DATASET=development npx sanity exec scripts/update-ai-profile.ts --with-user-token
 *
 * Safe to re-run; it replaces fields rather than appending duplicates.
 */
import { getCliClient } from "sanity/cli";

const dataset = process.env.TARGET_DATASET;
if (!dataset) {
  console.error("Set TARGET_DATASET (e.g. development or production).");
  process.exit(1);
}

const client = getCliClient({ apiVersion: "2025-10-01" }).withConfig({ dataset });

const role = "AI Engineer & Full Stack Developer";
const headline =
  "I build production web, mobile, and reactive backend systems — and use generative AI and AI-assisted development to design, build, and ship them faster.";
const summary = [
  "AI engineer and full stack developer with 4+ years of experience across cruise hospitality, insurance, telecom, and IoT. Right now I build and maintain both tiers of a crew-facing guest experience platform that runs on every ship in Royal Caribbean Group's 71-vessel fleet.",
  "I'm comfortable owning a feature end to end, and I'm known for modernizing legacy stacks — monolith to microservices, blocking to reactive, and outdated libraries to maintainable ones.",
  "I work hands-on with generative AI and AI-assisted development, using tools like Claude Code, GitHub Copilot, and Cursor across design, coding, testing, and code review.",
];
const aiPrinciple = {
  _key: "aiassisted",
  _type: "principle",
  title: "AI-assisted engineering",
  body: "Generative AI and tools like Claude Code, Copilot, and Cursor in everyday design, coding, testing, and review.",
};

type Keyed = { _key: string; title?: string; group?: string; items?: string[] };

async function main() {
  const [profile, skills] = await Promise.all([
    client.getDocument<{ principles?: Keyed[] }>("profile"),
    client.getDocument<{ groups?: Keyed[] }>("skills"),
  ]);
  if (!profile || !skills?.groups) throw new Error(`Missing profile or skills in "${dataset}".`);

  const principles = [...(profile.principles ?? []).filter((p) => p._key !== aiPrinciple._key), aiPrinciple];
  const groups = skills.groups.map((g) =>
    /\bai\b|ai-/i.test(g.group ?? "") ? { ...g, group: "AI Engineering", items: ["Generative AI", "AI-Assisted Development", "Claude Code", "GitHub Copilot", "Cursor"] } : g,
  );

  await client
    .transaction()
    .patch("profile", (p) => p.set({ role, headline, summary, principles }))
    .patch("skills", (p) => p.set({ groups }))
    .commit();
  console.log(`Updated profile and skills in "${dataset}": role = ${role}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
