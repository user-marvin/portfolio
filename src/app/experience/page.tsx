import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/sanity/content";
import { emphasizeNumbers } from "@/lib/emphasize-numbers";
import { isCurrent } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  return { title: `Experience — ${profile.shortName}`, description: `Work history of ${profile.name}.` };
}

/** Full work history as a timeline: every role with its project, highlights and stack, then education. */
export default async function ExperiencePage() {
  const { profile, experience, education } = await getContent();

  return (
    <main className="mx-auto grid max-w-[760px] gap-10 px-6 pb-20 pt-14 sm:px-7">
      <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-muted">
        <Link href="/" className="text-soft text-link">
          {profile.shortName.toLowerCase()}
        </Link>{" "}
        / experience
      </nav>

      <header className="grid gap-3">
        <h1 className="font-mono text-[clamp(30px,4vw,40px)] font-normal leading-tight tracking-[-0.02em]">Experience</h1>
        {profile.summary[0] && <p className="max-w-[600px] text-soft">{profile.summary[0]}</p>}
        <div className="flex flex-wrap gap-x-[18px] gap-y-1 font-mono text-[13px] text-soft">
          <Link href="/" className="text-link">
            ← back home
          </Link>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-link">
              résumé (pdf) ↗
            </a>
          )}
        </div>
      </header>

      <ol className="grid">
        {experience.map((job) => {
          const current = isCurrent(job.period);
          return (
            <TimelineEntry key={`${job.company}-${job.period}`} current={current}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span>{job.period}</span>
                {job.mode && <span>{job.mode}</span>}
                {current && <span className="rounded-full bg-ink px-2 text-[10px] tracking-[0.08em] text-bg">NOW</span>}
              </div>
              <h2 className="font-mono text-[19px] font-medium">{job.company}</h2>
              <p className="font-medium">{job.role}</p>
              {job.project && <p className="text-sm text-muted">{job.project}</p>}
              {job.highlights.length > 0 && (
                <ul className="mt-1 grid list-disc gap-1.5 pl-[18px] text-[14.5px] text-soft">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{emphasizeNumbers(highlight)}</li>
                  ))}
                </ul>
              )}
              {job.stack.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {job.stack.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </TimelineEntry>
          );
        })}

        {education.entries.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.period}`}>
            {entry.period && <div className="font-mono text-xs text-muted">{entry.period}</div>}
            <h2 className="font-mono text-[19px] font-medium">{entry.org ?? entry.title}</h2>
            {entry.org && <p className="font-medium">{entry.title}</p>}
            {entry.note && <p className="text-sm text-muted">{entry.note}</p>}
          </TimelineEntry>
        ))}
      </ol>
    </main>
  );
}

/** A dot on the vertical line, with the entry's details beside it; the current role's dot is filled. */
function TimelineEntry({ current = false, children }: { current?: boolean; children: React.ReactNode }) {
  return (
    <li className="relative ml-1.5 grid gap-2.5 border-l border-edge pb-11 pl-8 last:border-transparent last:pb-0">
      <span
        aria-hidden
        className={`absolute -left-[7px] top-1 h-[11px] w-[11px] rounded-full border-[1.5px] ${
          current ? "border-ink bg-ink" : "border-edge-strong bg-bg"
        }`}
      />
      {children}
    </li>
  );
}
