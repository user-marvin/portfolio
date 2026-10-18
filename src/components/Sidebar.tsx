import { FileText, Github, Mail } from "lucide-react";
import type { Profile } from "@/sanity/types";
import CommandPalette, { type PaletteItem } from "./CommandPalette";
import ThemeSwitch from "./ThemeSwitch";

type SidebarProps = {
  profile: Profile;
  sections: { href: string; label: string }[];
};

/** Left column on desktop (stays in place while the page scrolls); on top of the page on phones. */
export default function Sidebar({ profile, sections }: SidebarProps) {
  const paletteItems: PaletteItem[] = [
    ...sections.map((section) => ({ label: section.label, href: section.href, kind: "Section" as const })),
    { label: "Experience timeline", href: "/experience", kind: "Page" },
    ...(profile.resumeUrl ? [{ label: "Résumé (PDF)", href: profile.resumeUrl, kind: "Link" as const }] : []),
    ...(profile.github ? [{ label: "GitHub", href: profile.github, kind: "Link" as const }] : []),
  ];
  const [emailName, emailDomain] = profile.email.split("@");

  return (
    // Phones get one compact bar (name, menu, theme); the section links and email show from the lg breakpoint.
    <aside className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-[272px] lg:shrink-0 lg:flex-col lg:flex-nowrap lg:items-stretch lg:justify-start lg:gap-6 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:py-7">
      <a href="#top" className="font-mono text-[15px] font-medium">
        {profile.shortName}
      </a>

      <nav aria-label="Sections" className="hidden gap-0.5 text-sm lg:grid">
        {sections.map((section) => (
          <a key={section.href} href={section.href} className="flex min-h-8 items-center text-soft transition hover:text-ink">
            {section.label}
          </a>
        ))}
      </nav>

      <nav aria-label="Elsewhere" className="hidden gap-0.5 text-sm lg:grid">
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex min-h-8 items-center gap-2.5 text-soft transition hover:text-ink">
            <FileText size={15} aria-hidden /> Résumé
          </a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex min-h-8 items-center gap-2.5 text-soft transition hover:text-ink">
            <Github size={15} aria-hidden /> GitHub
          </a>
        )}
      </nav>

      <div className="flex items-center gap-3 text-[13px] lg:grid lg:border-t lg:border-line lg:pt-5">
        <CommandPalette items={paletteItems} />
        <ThemeSwitch />
      </div>

      <div className="hidden gap-2 border-t border-line pt-5 text-[13px] text-muted lg:grid">
        <span>{profile.availability ? `${profile.availability}. Email me at` : "Email me at"}</span>
        <span className="flex items-start gap-2 font-mono text-[11px] text-ink">
          <Mail size={14} aria-hidden className="mt-px shrink-0" />
          <span className="select-all">
            {emailName}
            <wbr />@{emailDomain}
          </span>
        </span>
      </div>
    </aside>
  );
}
