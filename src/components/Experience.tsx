import type { CSSProperties } from "react";
import type { Job } from "@/sanity/types";
import TimelineProgress from "./TimelineProgress";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function JobEntry({ job, current }: { job: Job; current: boolean }) {
  return (
    <li className="group relative grid gap-3 pb-16 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-10">
      {/* Grey rail draws downward on reveal; TimelineProgress fills it with accent while scrolling. */}
      <span
        aria-hidden
        data-reveal="line"
        className="absolute -bottom-1 left-[5px] top-3 w-px bg-line group-last:hidden sm:left-[calc(200px+2.5rem+5px)]"
      />
      <span
        aria-hidden
        data-reveal="pop"
        className="absolute left-0 top-1 z-[2] h-[11px] w-[11px] sm:left-[calc(200px+2.5rem)] sm:top-1.5"
      >
        {current && <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent" />}
        <span
          data-marker
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 data-[passed]:scale-125 data-[passed]:border-accent data-[passed]:bg-accent group-hover:scale-125 group-hover:border-accent ${
            current ? "border-accent bg-accent" : "border-line bg-bg"
          }`}
        />
      </span>

      <div data-reveal="slide" className="pl-7 sm:pl-0 sm:pt-0.5">
        <p className="font-mono text-xs text-muted transition-colors group-hover:text-ink">{job.period}</p>
        {job.mode && <p className="mt-1 font-mono text-xs text-muted/80">{job.mode}</p>}
      </div>

      <article className="pl-7 transition-transform duration-300 sm:group-hover:translate-x-1">
        <div data-reveal="slide" style={delay(80)}>
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {job.company}
            {current && (
              <span className="ml-2 align-middle font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-accent">
                Current
              </span>
            )}
          </h3>
          <p className="mt-0.5 text-[15px]">{job.role}</p>
          {job.project && <p className="mt-1 text-sm text-muted">{job.project}</p>}
        </div>

        {job.highlights.length > 0 && (
          <ul className="mt-5 space-y-3">
            {job.highlights.map((h, i) => (
              <li
                key={h}
                data-reveal="slide"
                style={delay(160 + i * 90)}
                className="grid grid-cols-[18px_1fr] gap-2 text-[15px] leading-relaxed text-ink/90"
              >
                <span aria-hidden className="mt-[0.7em] h-px w-3 bg-muted transition-all group-hover:w-4 group-hover:bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {job.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {job.stack.map((s, i) => (
              <li key={s} data-reveal="pop" style={delay(200 + i * 50)}>
                {/* Hover styles live on the inner span so they don't inherit the reveal delay. */}
                <span className="chip block font-mono !text-[12px] transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Experience</p>
          <h2 className="h2 max-w-2xl">Work history</h2>
        </div>

        <TimelineProgress>
          {jobs.map((job, i) => (
            <JobEntry key={`${job.company}-${i}`} job={job} current={/present/i.test(job.period)} />
          ))}
        </TimelineProgress>
      </div>
    </section>
  );
}
