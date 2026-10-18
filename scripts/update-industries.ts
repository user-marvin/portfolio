/**
 * Adds banking (Accenture's client) to the industries: the stats tile, the first summary paragraph and the
 * Accenture project line.
 *
 *   TARGET_DATASET=development npx sanity exec scripts/update-industries.ts --with-user-token
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

type Profile = { stats: { _key: string; label: string }[]; summary: string[] };
type Job = { _key: string; company: string };

async function main() {
  const profile = await client.fetch<Profile | null>(`*[_id == "profile"][0]{stats[]{_key, label}, summary}`);
  const industriesStat = profile?.stats.find((stat) => /industr/i.test(stat.label));
  if (!profile || !industriesStat) throw new Error(`No industries stat in "${dataset}"; nothing changed.`);

  const firstParagraph = profile.summary[0] ?? "";
  const updatedParagraph = firstParagraph.includes("banking")
    ? firstParagraph
    : firstParagraph.replace("cruise hospitality, insurance", "cruise hospitality, banking, insurance");

  await client
    .patch("profile")
    .set({
      [`stats[_key=="${industriesStat._key}"].value`]: "4",
      [`stats[_key=="${industriesStat._key}"].label`]: "industries: cruise, banking, insurance, IoT",
      "summary[0]": updatedParagraph,
    })
    .commit();

  const jobs = await client.fetch<Job[] | null>(`*[_id == "experience"][0].jobs[]{_key, company}`);
  const accenture = jobs?.find((job) => job.company.startsWith("Accenture"));
  if (!accenture) throw new Error(`No Accenture job in "${dataset}"; the profile was updated, the job was not.`);
  await client
    .patch("experience")
    .set({ [`jobs[_key=="${accenture._key}"].project`]: "Banking Industry · CG 2, Mandaluyong City" })
    .commit();

  console.log(`Industries updated in "${dataset}".`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
