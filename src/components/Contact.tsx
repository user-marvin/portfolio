import { ArrowUpRight, FileText, Github } from "lucide-react";
import type { Profile } from "@/sanity/types";
import CopyEmail from "./CopyEmail";

export default function Contact({ profile }: { profile: Profile }) {
  const links = [
    profile.github && {
      href: profile.github,
      label: "GitHub",
      sub: profile.github.replace(/^https?:\/\/(www\.)?/, ""),
      icon: Github,
    },
    profile.resumeUrl && { href: profile.resumeUrl, label: "Résumé", sub: "Download PDF", icon: FileText },
  ].filter((l) => !!l);

  return (
    <section id="contact" className="section pb-10">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow pt-1.5">Contact</p>
          <div>
            <h2 className="h2">Let&apos;s work together.</h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {profile.contactBlurb}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                Email me <ArrowUpRight size={16} />
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
        </div>

        {links.length > 0 && (
        <ul data-reveal className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:ml-[200px] sm:grid-cols-2">
          {links.map(({ href, label, sub, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between bg-surface p-5 transition hover:bg-bg">
                <span className="flex items-center gap-4">
                  <Icon size={20} className="text-muted transition group-hover:text-accent" />
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-muted">{sub}</span>
                  </span>
                </span>
                <ArrowUpRight size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </a>
            </li>
          ))}
        </ul>
        )}

        <footer className="mt-20 flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </footer>
      </div>
    </section>
  );
}
