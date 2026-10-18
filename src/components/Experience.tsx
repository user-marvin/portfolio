import type { Job } from "@/sanity/types";
import { startYear } from "@/lib/portfolio";
import SectionHeading from "./SectionHeading";

/** One row per role; "Full history" opens the timeline page with every detail. */
export default function Experience({ jobs, number }: { jobs: Job[]; number: string }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="grid scroll-mt-6 gap-[22px]">
      <SectionHeading id="experience-title" number={number} title="experience" link={{ href: "/experience", label: "Full history" }} />
      <ul className="border-t border-line">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.period}`} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-line py-3.5">
            <span className="w-[70px] shrink-0 font-mono text-xs text-muted">{startYear(job.period)}</span>
            <span className="min-w-[220px] flex-1 font-medium">{job.role}</span>
            <span className="text-sm text-muted">{[job.company, job.mode].filter(Boolean).join(" · ")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
