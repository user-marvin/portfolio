/**
 * Uploads public/Marvin-Villamar-Resume.pdf and points the Profile's résumé file at it.
 *
 *   npm run resume:pdf
 *   TARGET_DATASET=development npx sanity exec scripts/upload-resume.ts --with-user-token
 */
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const dataset = process.env.TARGET_DATASET;
if (!dataset) {
  console.error("Set TARGET_DATASET (e.g. development or production).");
  process.exit(1);
}

const client = getCliClient({ apiVersion: "2025-10-01" }).withConfig({ dataset });

async function main() {
  const asset = await client.assets.upload(
    "file",
    createReadStream(join(process.cwd(), "public/Marvin-Villamar-Resume.pdf")),
    { filename: "Marvin-Villamar-Resume.pdf", contentType: "application/pdf" },
  );
  await client
    .patch("profile")
    .set({ resumeFile: { _type: "file", asset: { _type: "reference", _ref: asset._id } } })
    .commit();
  console.log(`Résumé updated in "${dataset}": ${asset.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
