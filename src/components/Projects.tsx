import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";
import type { SiteContent } from "@/sanity/types";
import SectionHeading from "./SectionHeading";
import TrackJobDemo from "./TrackJobDemo";

// Projects with a live demo, by title (lower case): the demo replaces the screenshot and the card spans the row.
const DEMOS: Record<string, ComponentType> = { trackjob: TrackJobDemo };

/** Project cards: screenshot when there is one, year, description, stack and links. */
export default function Projects({
  projects,
  github,
  number,
}: {
  projects: SiteContent["projects"];
  github?: string;
  number: string;
}) {
  const showAllLink = projects.showMoreCard && github;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="grid scroll-mt-6 gap-[22px]"
    >
      <SectionHeading
        id="projects-title"
        number={number}
        title="projects"
        link={
          showAllLink
            ? { href: github, label: "All projects", external: true }
            : undefined
        }
      />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
        {projects.items.map((project, index) => {
          const Demo = DEMOS[project.title.trim().toLowerCase()];
          return (
            <li
              key={project.title}
              data-reveal
              style={
                { "--reveal-delay": `${(index % 2) * 80}ms` } as CSSProperties
              }
              className={`card flex flex-col overflow-hidden ${Demo ? "col-span-full" : ""}`}
            >
              {Demo ? (
                <div className="border-b border-edge bg-bg p-3 sm:p-5">
                  <Demo />
                </div>
              ) : (
                project.image && (
                  <Image
                    src={`${project.image.url}?w=1200&auto=format`}
                    alt={project.image.alt ?? project.title}
                    width={project.image.width ?? 1200}
                    height={project.image.height ?? 675}
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="aspect-[16/9] w-full border-b border-edge object-cover"
                  />
                )
              )}
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex justify-between gap-2 font-mono text-[11px] text-muted">
                  <span>{project.year}</span>
                  {project.links[0] && (
                    <a
                      href={project.links[0].href}
                      target="_blank"
                      rel="noreferrer"
                      className="uppercase hover:text-ink"
                    >
                      {project.links[0].label} ↗
                    </a>
                  )}
                </div>
                <h3 className="font-mono text-base font-medium">
                  {project.title}
                </h3>
                <p className="flex-1 text-sm text-soft">
                  {project.description}
                </p>
                {project.stack.length > 0 && (
                  <p className="font-mono text-[11px] lowercase text-muted">
                    {project.stack.join(" · ")}
                  </p>
                )}
                {project.links.length > 1 && (
                  <div className="flex flex-wrap gap-4 border-t border-line pt-3 font-mono text-xs">
                    {project.links.slice(1).map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-soft hover:text-ink"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
