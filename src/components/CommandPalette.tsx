"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export type PaletteItem = { label: string; href: string; kind: "Section" | "Page" | "Link" };

/** "Jump to section" button plus a ⌘K / Ctrl+K menu to filter and open sections and links. */
export default function CommandPalette({ items }: { items: PaletteItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? items.filter((item) => `${item.label} ${item.kind}`.toLowerCase().includes(normalizedQuery))
    : items;

  const open = () => {
    setQuery("");
    setActiveIndex(0);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (item: PaletteItem | undefined) => {
    if (!item) return;
    close();
    if (item.kind === "Link") window.open(item.href, "_blank", "noopener");
    else window.location.href = item.href;
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex min-h-[30px] items-center justify-between gap-2 rounded-md border border-edge px-2.5 text-left text-muted transition hover:text-ink lg:w-full lg:border-0 lg:px-0"
      >
        <span className="hidden lg:inline">Jump to section</span>
        <span className="inline-flex items-center gap-1.5 lg:hidden">
          <Search size={14} aria-hidden /> Menu
        </span>
        <span className="hidden gap-1 font-mono text-[11px] lg:flex" aria-hidden>
          <kbd className="rounded border border-edge px-1.5">⌘</kbd>
          <kbd className="rounded border border-edge px-1.5">K</kbd>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Jump to section"
        onClick={(event) => event.target === dialogRef.current && close()}
        className="w-[min(560px,calc(100vw-32px))] rounded-xl border border-edge-strong bg-surface p-0 text-ink backdrop:bg-black/55"
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Search size={16} aria-hidden className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((index) => Math.max(index - 1, 0));
              } else if (event.key === "Enter") {
                go(matches[activeIndex]);
              }
            }}
            placeholder="Jump to a section or link…"
            aria-label="Search sections and links"
            autoComplete="off"
            className="min-h-9 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
        </div>
        {matches.length > 0 ? (
          <ul className="max-h-[340px] overflow-y-auto p-2">
            {matches.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex justify-between gap-3 rounded-lg px-3 py-2.5 ${index === activeIndex ? "bg-line" : ""}`}
                >
                  <span>{item.label}</span>
                  <span className="label self-center">{item.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-5 text-center text-muted">No matches.</p>
        )}
      </dialog>
    </>
  );
}
