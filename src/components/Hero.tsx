import type { SiteContent } from "@/sanity/types";
import { isCurrent, splitCertification } from "@/lib/portfolio";

/** Name, intro and links, then a row of credentials and the profile's stats. */
export default function Hero({ content }: { content: SiteContent }) {
  const { profile, experience, education } = content;
  const currentJob = experience.find((job) => isCurrent(job.period));
  const firstCertification = education.certifications[0] ? splitCertification(education.certifications[0]) : null;
  const school = education.entries.find((entry) => entry.org && /univ|college|school/i.test(entry.org));

  const credentials = [
    currentJob && { mark: initials(currentJob.company), title: currentJob.company, label: "Current role" },
    firstCertification && {
      mark: initials(firstCertification.issuer ?? firstCertification.name),
      title: firstCertification.issuer ? `${firstCertification.issuer} certified` : firstCertification.name,
      label: firstCertification.name.replace(/^\w+ Certified:\s*/, ""),
    },
    school && { mark: initials(school.org ?? school.title), title: school.org ?? school.title, label: [school.title, school.note].filter(Boolean).join(" · ") },
  ].filter((credential) => !!credential);

  return (
    <section aria-labelledby="hero-name" className="grid gap-10">
      <div className="grid max-w-[620px] gap-4">
        <h1 id="hero-name" className="font-mono text-[clamp(36px,5vw,52px)] font-normal leading-[1.05] tracking-[-0.02em]">
          {profile.shortName}
        </h1>
        <p className="text-soft">{profile.headline}</p>
        {profile.currently && <p className="text-soft">Right now I&apos;m building {profile.currently}.</p>}
        <div className="flex flex-wrap gap-x-[18px] gap-y-1 font-mono text-[13px] text-soft">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-link">
              github ↗
            </a>
          )}
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-link">
              résumé ↗
            </a>
          )}
          <a href="#contact" className="text-link">
            email ↗
          </a>
        </div>
      </div>

      {/* Stacked on phones (dividers between rows); side by side from sm (dividers between columns). */}
      <div className="grid border-y border-line sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {credentials.map((credential) => (
          <div
            key={credential.title}
            className="flex items-center gap-2.5 border-line py-3 [&:not(:last-child)]:border-b sm:py-4 sm:pr-4 sm:[&:not(:first-child)]:pl-4 sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-edge font-mono text-[11px]">
              {credential.mark}
            </span>
            <span className="grid min-w-0 leading-tight">
              <span className="text-[13px] font-medium">{credential.title}</span>
              <span className="label truncate" title={credential.label}>
                {credential.label}
              </span>
            </span>
          </div>
        ))}
      </div>

      {profile.stats.length > 0 && (
        // Two per row on phones, one row from sm.
        <dl className="-mt-10 grid grid-cols-2 border-b border-line sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {profile.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`grid content-start gap-0.5 border-line py-[18px] pr-4 ${index % 2 === 1 ? "border-l pl-4" : ""} ${
                index >= 2 ? "border-t sm:border-t-0" : ""
              } ${index > 0 && index % 2 === 0 ? "sm:border-l sm:pl-4" : ""}`}
            >
              <dd className="order-1 font-mono text-2xl">{stat.value}</dd>
              <dt className="label order-2">{stat.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/** "Royal Caribbean Group" → "RC", "Microsoft" → "M". */
function initials(name: string): string {
  const words = name.split(/\s+/).filter((word) => /^[A-Za-z]/.test(word));
  return (words.length > 1 ? words[0][0] + words[1][0] : name[0]).toUpperCase();
}
