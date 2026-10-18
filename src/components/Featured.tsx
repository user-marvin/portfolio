import { Ship } from "lucide-react";
import type { FeaturedWork, Job } from "@/sanity/types";
import { splitTitle } from "@/lib/portfolio";
import SectionHeading from "./SectionHeading";

/** The featured project card: outcomes as pills, the stack tier by tier, and how it's delivered. */
export default function Featured({ work, job, number }: { work: FeaturedWork; job?: Job; number: string }) {
  const { name, subtitle } = splitTitle(work.title);

  return (
    <section id="featured" aria-labelledby="featured-title" className="grid scroll-mt-6 gap-[22px]">
      <SectionHeading id="featured-title" number={number} title="featured" />
      <article data-reveal className="card grid gap-4 p-6">
        {work.outcomes.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {work.outcomes.map((outcome, index) => (
              <li
                key={outcome.title}
                title={outcome.body}
                className={index === 0 ? "pill border-ink bg-ink text-bg" : "pill"}
              >
                {outcome.title}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-ink text-bg">
            <Ship size={24} aria-hidden />
          </span>
          <div className="leading-tight">
            <h3 className="font-mono text-lg font-medium">{name}</h3>
            <p className="text-[13px] text-muted">{[subtitle, job?.period].filter(Boolean).join(" · ")}</p>
          </div>
        </div>

        {work.intro && <p className="text-soft">{work.intro}</p>}

        {work.tiers.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 font-mono text-xs">
            {work.tiers.map((tier) => (
              <div key={tier.title} className="rounded-lg border border-edge px-3 py-2.5">
                <div className="label">{tier.label ?? tier.title}</div>
                <div className="mt-0.5 font-sans text-[13px] font-medium">{tier.title}</div>
                <div className="mt-1 text-muted">{tier.items.join(" · ")}</div>
              </div>
            ))}
          </div>
        )}

        {work.delivery.length > 0 && (
          <p className="font-mono text-xs text-muted">Delivered via {work.delivery.join(" → ")}</p>
        )}
      </article>
    </section>
  );
}
