import { Award, GraduationCap } from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/sanity/types";

export default function Education({ education }: { education: SiteContent["education"] }) {
  const { entries, certifications } = education;
  if (entries.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Education</p>
          <h2 className="h2 max-w-2xl">Education &amp; certifications</h2>
        </div>

        <div className="grid gap-4 sm:ml-[200px] md:grid-cols-2">
          {entries.length > 0 && (
            <div data-reveal className="card p-6">
              <h3 className="eyebrow flex items-center gap-2">
                <GraduationCap size={14} /> Education
              </h3>
              <ul className="mt-5 space-y-6">
                {entries.map((e) => (
                  <li key={e.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-medium">{e.title}</h4>
                      {e.period && <span className="font-mono text-xs text-muted">{e.period}</span>}
                    </div>
                    {e.org && <p className="mt-1 text-sm text-muted">{e.org}</p>}
                    {e.note && (
                      <p className="mt-2 text-sm">
                        {e.note.length <= 24 ? <span className="chip">{e.note}</span> : e.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certifications.length > 0 && (
            <div data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties} className="card p-6">
              <h3 className="eyebrow flex items-center gap-2">
                <Award size={14} /> Certifications
              </h3>
              <ul className="mt-5 divide-y divide-line">
                {certifications.map((c) => (
                  <li key={c} className="py-3 text-sm first:pt-0 last:pb-0">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
