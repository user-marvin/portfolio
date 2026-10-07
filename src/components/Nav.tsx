"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
type NavProps = {
  shortName: string;
  resumeUrl?: string;
  sections: { work: boolean; experience: boolean; projects: boolean; skills: boolean };
};

// Reads the theme class set by the inline script in layout.tsx; null during server render.
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => null,
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition hover:border-ink"
    >
      {dark === null ? null : dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function Nav({ shortName, resumeUrl, sections }: NavProps) {
  const links = [
    { href: "#about", label: "About" },
    sections.work && { href: "#work", label: "Work" },
    sections.experience && { href: "#experience", label: "Experience" },
    sections.projects && { href: "#projects", label: "Projects" },
    sections.skills && { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ].filter((l) => !!l);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-xs font-semibold text-bg">
            MV
          </span>
          <span className="hidden text-sm font-medium sm:inline">{shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-md px-3 py-1.5 text-sm transition hover:text-ink ${
                  active === l.href ? "text-ink" : "text-muted"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-primary hidden !py-2 sm:inline-flex">
              Résumé
            </a>
          )}
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md border border-line md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="container flex flex-col pb-5 md:hidden">
          {[...links, ...(resumeUrl ? [{ href: resumeUrl, label: "Résumé (PDF)" }] : [])].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-lg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
