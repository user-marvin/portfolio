"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";

type ThemeChoice = "system" | "light" | "dark";

const OPTIONS: { value: ThemeChoice; label: string; icon: LucideIcon }[] = [
  { value: "system", label: "System theme", icon: Monitor },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
];

const listeners = new Set<() => void>();
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function readChoice(): ThemeChoice {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function applyChoice(choice: ThemeChoice) {
  const dark = choice === "system" ? darkQuery().matches : choice === "dark";
  document.documentElement.classList.toggle("dark", dark);
}

/** System / light / dark. "System" follows the OS setting, also when it changes while the page is open. */
export default function ThemeSwitch() {
  // null while rendering on the server, so no button claims to be pressed before the saved choice is known.
  const choice = useSyncExternalStore(subscribe, readChoice, () => null);

  useEffect(() => {
    if (choice !== "system") return;
    const media = darkQuery();
    const followSystem = () => applyChoice("system");
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, [choice]);

  const choose = (next: ThemeChoice) => {
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // Not remembered (storage blocked), but still applied for this visit.
    }
    applyChoice(next);
    listeners.forEach((listener) => listener());
  };

  return (
    <div className="flex gap-1.5" role="group" aria-label="Theme">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={choice === value}
          onClick={() => choose(value)}
          className="grid h-[30px] w-[34px] place-items-center rounded-md border border-edge text-muted transition hover:text-ink aria-pressed:border-edge-strong aria-pressed:bg-surface aria-pressed:text-ink"
        >
          <Icon size={14} aria-hidden />
        </button>
      ))}
    </div>
  );
}
