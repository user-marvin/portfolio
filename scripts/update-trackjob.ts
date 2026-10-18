/**
 * Updates the TrackJob project's description in the Projects document to cover its latest features.
 *
 *   TARGET_DATASET=development npx sanity exec scripts/update-trackjob.ts --with-user-token
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

const description =
  "Your whole job search in one dashboard. TrackJob finds open roles that match your résumé, then tracks every application for you: it reads your Gmail and moves each one from applied to interview to offer on its own. Interview prep and your progress live in the same place, so you never juggle job boards, spreadsheets and inboxes again. Try it as a guest, no sign-up needed.";

async function main() {
  const items = await client.fetch<{ _key: string; title: string }[] | null>(`*[_id == "projects"][0].items[]{_key, title}`);
  const trackjob = items?.find((item) => item.title.trim().toLowerCase() === "trackjob");
  if (!trackjob) {
    console.error(`No TrackJob project in "${dataset}"; nothing changed.`);
    process.exit(1);
  }
  await client
    .patch("projects")
    .set({ [`items[_key=="${trackjob._key}"].description`]: description })
    .commit();
  console.log(`TrackJob description updated in "${dataset}".`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
