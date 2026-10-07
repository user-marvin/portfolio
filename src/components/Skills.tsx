import type { SkillGroup } from "@/sanity/types";

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
                  <li key={i} className="chip transition hover:border-ink">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
