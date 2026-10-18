import { Activity, ChartLine, Cloud, Code, Database, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { SkillGroup } from "@/sanity/types";
import { skillLogo } from "@/lib/skill-icons";
import SectionHeading from "./SectionHeading";

// Generic icon for skills without a brand logo, picked from the group they're in.
function groupIcon(group: string): LucideIcon {
  const groupName = group.toLowerCase();
  if (/viz|map|chart/.test(groupName)) return ChartLine;
  if (/data/.test(groupName)) return Database;
  if (/cloud|deploy|delivery|devops/.test(groupName)) return Cloud;
  if (/test/.test(groupName)) return FlaskConical;
  if (/observ|monitor/.test(groupName)) return Activity;
  if (/\bai\b|ai-/.test(groupName)) return Sparkles;
  return Code;
}

function SkillChip({ name, fallback: Fallback }: { name: string; fallback: LucideIcon }) {
  const logo = skillLogo(name);
  return (
    <li
      className="chip group inline-flex items-center gap-1.5 transition hover:border-ink"
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

/** Every skill group, each skill with its brand logo where there is one. */
export default function Skills({ groups, number }: { groups: SkillGroup[]; number: string }) {
  return (
    <section id="stack" aria-labelledby="stack-title" className="grid scroll-mt-6 gap-[22px]">
      <SectionHeading id="stack-title" number={number} title="stack" />
      <div className="grid gap-4">
        {groups.map((skillGroup) => (
          <div key={skillGroup.group} data-reveal className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h3 className="label w-[130px] shrink-0 text-[11px]">{skillGroup.group}</h3>
            <ul className="flex min-w-[260px] flex-1 flex-wrap gap-1.5">
              {skillGroup.items.map((item) => (
                <SkillChip key={item} name={item} fallback={groupIcon(skillGroup.group)} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
