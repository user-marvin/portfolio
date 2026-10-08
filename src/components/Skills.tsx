import { Activity, ChartLine, Cloud, Code, Database, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { SkillGroup } from "@/sanity/types";
import { skillLogo } from "@/lib/skill-icons";

// Generic icon for skills without a brand logo, picked from the group they're in.
function groupIcon(group: string): LucideIcon {
  const g = group.toLowerCase();
  if (/viz|map|chart/.test(g)) return ChartLine;
  if (/data/.test(g)) return Database;
  if (/cloud|deploy|delivery|devops/.test(g)) return Cloud;
  if (/test/.test(g)) return FlaskConical;
  if (/observ|monitor/.test(g)) return Activity;
  if (/\bai\b|ai-/.test(g)) return Sparkles;
  return Code;
}

function SkillChip({ name, fallback: Fallback }: { name: string; fallback: LucideIcon }) {
  const logo = skillLogo(name);
  return (
    <li
      className="chip group gap-1.5 transition hover:border-ink"
      style={logo ? ({ "--brand": logo.hover } as CSSProperties) : undefined}
    >
      {logo ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 shrink-0 fill-current text-muted transition-colors group-hover:text-[color:var(--brand)]"
        >
          <path d={logo.path} />
        </svg>
      ) : (
        <Fallback aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-ink" />
      )}
      {name}
    </li>
  );
}

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Skills</p>
          <h2 className="h2 max-w-2xl">Technical toolkit</h2>
        </div>

        <div className="divide-y divide-line border-y border-line sm:ml-[200px]">
          {groups.map((s) => (
            <div key={s.group} data-reveal className="grid gap-4 py-6 md:grid-cols-[160px_1fr]">
              <h3 className="font-mono text-sm text-muted">{s.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <SkillChip key={i} name={i} fallback={groupIcon(s.group)} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
