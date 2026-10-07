/**
 * One-time import of the local content (src/data/resume.ts) into Sanity.
 *
 *   npm run sanity:seed
 *
 * Runs with your logged-in Sanity CLI session (`npx sanity login`), so no API token is needed.
 * Re-running it overwrites the six section documents with the local copy.
 */
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";
import { localContent } from "../src/data/resume";

const client = getCliClient({ apiVersion: "2025-10-01" });

let n = 0;
const key = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const withKeys = <T extends object>(items: T[], type: string) => items.map((item) => ({ _key: key(), _type: type, ...item }));

async function main() {
  const { profile, featuredWork, experience, projects, skills, education } = localContent;

  console.log("Uploading résumé PDF…");
  const resume = await client.assets.upload(
    "file",
    createReadStream(join(process.cwd(), "public/Marvin-Villamar-Resume.pdf")),
    { filename: "Marvin-Villamar-Resume.pdf", contentType: "application/pdf" },
  );

  const { resumeUrl: _localResume, stats, principles, summary, ...profileFields } = profile;
  void _localResume;

  const docs: { _id: string; _type: string; [field: string]: unknown }[] = [
    {
      _id: "profile",
      _type: "profile",
      ...profileFields,
      summary: summary.map((s) => s),
      stats: withKeys(stats, "stat"),
      principles: withKeys(principles, "principle"),
      resumeFile: { _type: "file", asset: { _type: "reference", _ref: resume._id } },
    },
    {
      _id: "featuredWork",
      _type: "featuredWork",
      ...featuredWork,
      tiers: withKeys(featuredWork.tiers, "tier"),
      outcomes: withKeys(featuredWork.outcomes, "outcome"),
    },
    { _id: "experience", _type: "experience", jobs: withKeys(experience, "job") },
    {
      _id: "projects",
      _type: "projects",
      showMoreCard: projects.showMoreCard,
      items: withKeys(
        projects.items.map(({ image: _image, links, ...p }) => {
          void _image;
          return { ...p, links: withKeys(links, "link") };
        }),
        "project",
      ),
    },
    { _id: "skills", _type: "skills", groups: withKeys(skills, "skillGroup") },
    {
      _id: "education",
      _type: "education",
      entries: withKeys(education.entries, "educationEntry"),
      certifications: education.certifications,
    },
  ];

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();
  console.log(`Seeded ${docs.length} documents: ${docs.map((d) => d._id).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
