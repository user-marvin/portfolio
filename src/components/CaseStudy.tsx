import type { CSSProperties } from "react";
import type { FeaturedWork } from "@/sanity/types";

export default function CaseStudy({ work }: { work: FeaturedWork }) {
  const cols = Math.min(Math.max(work.tiers.length, 1), 4);
  const gridCols = ["", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"][cols];

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Featured work</p>
          <div>
            <h2 className="h2 max-w-2xl">{work.title}</h2>
            {work.intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{work.intro}</p>}
          </div>
        </div>

        {work.tiers.length > 0 && (
          <figure data-reveal className="sm:ml-[200px]">
            <ol
              className={`grid divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface md:divide-x md:divide-y-0 ${gridCols}`}
            >
              {work.tiers.map((t, i) => (
                <li key={`${t.title}-${i}`} className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                    {t.label && ` · ${t.label}`}
                    {i < work.tiers.length - 1 && <span className="ml-1 text-accent">→</span>}
                  </p>
                  <p className="mt-2 text-sm font-medium">{t.title}</p>
                  <ul className="mt-3 space-y-1">
                    {t.items.map((item) => (
                      <li key={item} className="font-mono text-[12px] text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            {work.delivery.length > 0 && (
              <figcaption className="mt-3 font-mono text-[12px] text-muted">
                Delivered via {work.delivery.join(" → ")}
              </figcaption>
            )}
          </figure>
        )}

        {work.outcomes.length > 0 && (
          <dl className="mt-12 grid gap-x-10 gap-y-7 sm:ml-[200px] md:grid-cols-2">
            {work.outcomes.map((o, i) => (
              <div key={o.title} data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as CSSProperties}>
                <dt className="font-medium">{o.title}</dt>
                {o.body && <dd className="mt-1.5 text-sm leading-relaxed text-muted">{o.body}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
