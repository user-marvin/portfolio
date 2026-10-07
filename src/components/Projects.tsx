import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/sanity/types";

export default function Projects({ projects, github }: { projects: SiteContent["projects"]; github?: string }) {
  const { items, showMoreCard } = projects;
  if (items.length === 0 && !showMoreCard) return null;

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Projects</p>
          <h2 className="h2 max-w-2xl">Selected projects</h2>
        </div>

        <ul className="grid gap-4 sm:ml-[200px] md:grid-cols-2">
          {items.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as CSSProperties}
              className="card flex flex-col overflow-hidden transition-colors hover:border-ink/40"
            >
              {p.image && (
                <Image
                  src={`${p.image.url}?w=1200&auto=format`}
                  alt={p.image.alt ?? p.title}
                  width={p.image.width ?? 1200}
                  height={p.image.height ?? 675}
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="aspect-[16/9] w-full border-b border-line object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">{p.title}</h3>
                  {p.year && <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                {p.stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-[11.5px] text-muted after:ml-1.5 after:content-['·'] last:after:content-none"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {p.links.length > 0 && (
                  <div className="mt-5 flex gap-4 border-t border-line pt-4">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm hover:text-accent"
                      >
                        {l.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}

          {showMoreCard && (
            <li data-reveal className="flex flex-col justify-center rounded-xl border border-dashed border-line p-6">
              <p className="font-medium">More on the way</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                New projects and write-ups are being added.
                {github && " In the meantime, see what I'm working on in public."}
              </p>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm hover:text-accent"
                >
                  <Github size={15} /> {github.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              )}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
