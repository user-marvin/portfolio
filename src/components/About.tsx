import type { CSSProperties } from "react";
import type { Profile } from "@/sanity/types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">About</p>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {profile.summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {profile.principles.length > 0 && (
          <ul className="grid gap-8 border-t border-line pt-8 sm:ml-[200px] md:grid-cols-3">
            {profile.principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
                <h3 className="font-medium">{p.title}</h3>
                {p.body && <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
