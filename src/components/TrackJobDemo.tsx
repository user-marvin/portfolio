"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  BarChart3,
  BookmarkPlus,
  CalendarClock,
  CalendarDays,
  Check,
  CheckCircle2,
  Flame,
  GraduationCap,
  KanbanSquare,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Search,
  Sparkles,
  Telescope,
  Video,
  type LucideIcon,
} from "lucide-react";

// A product tour of TrackJob, following the app's own navigation: Dashboard → Board → Review → Interviews →
// Analytics → Practice, each screen with a short story. It plays on its own; clicking a tab stays on that
// screen. Every element has its own slot, so nothing shifts while it animates. Companies, jobs and numbers
// are sample data, and the window is labelled DEMO.

type Scene = "dashboard" | "board" | "review" | "interviews" | "analytics" | "practice";

/** How long each phase of a scene stays on screen (ms). */
const SCENES: { id: Scene; label: string; icon: LucideIcon; phases: number[] }[] = [
  { id: "dashboard", label: "Dashboard", icon: Telescope, phases: [2000, 2800] },
  { id: "board", label: "Board", icon: KanbanSquare, phases: [1600, 2400, 2000, 3000] },
  { id: "review", label: "Review", icon: MessageSquareText, phases: [2200, 3000] },
  { id: "interviews", label: "Interviews", icon: CalendarDays, phases: [700, 2200, 3600] },
  { id: "analytics", label: "Analytics", icon: BarChart3, phases: [600, 4200] },
  { id: "practice", label: "Practice", icon: GraduationCap, phases: [2200, 3400] },
];

// TrackJob's own status colours, so the demo looks like the app.
const STATUS = { saved: "#0E7490", applied: "#2F6FEB", initial: "#7A5AF8", technical: "#B26A00", offer: "#1F8A4C" } as const;
const BRAND = "text-[#0C6E6B] dark:text-[#48C8BA]";
const BRAND_BG = "bg-[#0C6E6B] dark:bg-[#48C8BA]";
const SUCCESS = "text-[#1F8A4C] dark:text-[#4CC283]";

function Small({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`truncate text-[11px] text-muted ${className}`}>{children}</p>;
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <p className="text-[15px] font-semibold">{title}</p>
      <p className="text-[11px] text-muted">{subtitle}</p>
    </div>
  );
}

function Chip({ children, color, filled = false }: { children: ReactNode; color: string; filled?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded border px-1.5 py-px text-[10.5px] font-semibold"
      style={{ borderColor: color, color: filled ? "#fff" : color, background: filled ? color : "transparent" }}
    >
      {children}
    </span>
  );
}

/** A quiet, neutral tag (location, job type, skill). */
function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-edge px-2 py-px text-[10.5px] text-muted">{children}</span>;
}

function Panel({
  children,
  highlight = false,
  className = "",
  style,
}: {
  children: ReactNode;
  highlight?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`rounded-md border bg-surface p-2.5 transition-colors duration-500 ${
        highlight ? "border-[#0C6E6B] dark:border-[#48C8BA]" : "border-edge"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Card({ company, role, color, label, highlight = false }: { company: string; role: string; color: string; label: string; highlight?: boolean }) {
  return (
    <Panel highlight={highlight} className={highlight ? "animate-demo-arrive shadow-lg" : "shadow-sm"}>
      <p className="truncate text-[13px] font-semibold">{company}</p>
      <p className="truncate text-xs text-muted">{role}</p>
      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color }}>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
        {label}
      </span>
    </Panel>
  );
}

/* ── Dashboard: jobs for the title on the résumé, one saved for later ───────────────────────── */

const JOBS = [
  {
    title: "Full Stack Developer",
    company: "Orbit Studio",
    where: "Makati, Philippines",
    type: "Full-time",
    pay: "PHP 90k–120k / mo",
    source: "via JobStreet",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Senior Full Stack Engineer",
    company: "Nimbus Health",
    where: "Remote · Philippines",
    type: "Full-time",
    pay: "USD 3k–4k / mo",
    source: "Himalayas",
    skills: ["TypeScript", "Next.js", "AWS"],
  },
];

function DashboardScene({ phase }: { phase: number }) {
  const saved = phase >= 1;
  return (
    <>
      <Panel className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-edge px-2 py-1 text-xs">
            <Search size={13} className="shrink-0 text-muted" aria-hidden />
            <span className="truncate">Full stack developer</span>
          </div>
          <div className="hidden overflow-hidden rounded-md border border-edge text-[11px] sm:flex">
            {["Anywhere", "Remote", "Philippines"].map((where) => (
              <span key={where} className={`px-2 py-1 ${where === "Philippines" ? `bg-ink/[0.06] font-semibold ${BRAND}` : "text-muted"}`}>
                {where}
              </span>
            ))}
          </div>
          <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${BRAND_BG} dark:text-[#0A0A0B]`}>Search</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[10.5px] text-muted">
          <span>Posted: this week</span>·<span>Full-time</span>·<span>Pay at least PHP 80k / mo</span>
        </div>
      </Panel>

      <div className="flex flex-wrap items-baseline gap-x-2">
        <p className="text-xs font-semibold">48 roles for &ldquo;Full stack developer&rdquo; · Philippines</p>
        <Small>Jobs for the title on your résumé</Small>
      </div>

      {JOBS.map((job, index) => {
        const justSaved = saved && index === 0;
        return (
          <Panel key={job.company} highlight={justSaved} className="grid gap-1.5">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold">{job.title}</p>
                <Small>{job.company}</Small>
              </div>
              {justSaved ? (
                <span className={`inline-flex animate-demo-rise items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${SUCCESS}`}>
                  <Check size={14} aria-hidden /> Saved to your board
                </span>
              ) : (
                <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${BRAND}`}>
                  <BookmarkPlus size={14} aria-hidden /> Save for later
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              <Tag>
                <MapPin size={11} aria-hidden /> {job.where}
              </Tag>
              <Tag>{job.type}</Tag>
              <Tag>{job.pay}</Tag>
              <Tag>{job.source}</Tag>
            </div>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill) => (
                <span key={skill} className="rounded border border-edge px-1.5 text-[10px] text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </Panel>
        );
      })}
    </>
  );
}

/* ── Board: the saved job waits in Saved; an email moves an application forward ────────────── */

const COLUMNS = [
  { key: "saved", label: "Saved", color: STATUS.saved },
  { key: "applied", label: "Applied", color: STATUS.applied },
  { key: "technical", label: "Technical", color: STATUS.technical },
] as const;

function BoardScene({ phase }: { phase: number }) {
  const moved = phase >= 2;
  const emailShown = phase === 1 || phase === 2;
  const lumen = moved ? (
    <Card key="moved" company="Lumen Health" role="Frontend Engineer" color={STATUS.technical} label="Technical" highlight={phase === 2} />
  ) : (
    <Card key="applied" company="Lumen Health" role="Frontend Engineer" color={STATUS.applied} label="Applied" />
  );

  return (
    <>
      {/* Email slot: reserved height so the board never shifts or gets covered */}
      <div className="relative h-[62px]">
        <div
          className={`absolute inset-0 flex items-center gap-2 rounded-md border border-dashed border-edge px-3 transition-opacity duration-300 ${
            emailShown ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${BRAND_BG} animate-demo-pulse`} />
          <span className="text-xs text-muted">Checking your inbox for job emails every 5 minutes…</span>
        </div>
        <Panel
          highlight={phase === 1}
          className={`relative flex items-start gap-2 transition-all duration-300 ${emailShown ? "opacity-100" : "-translate-y-1.5 opacity-0"}`}
        >
          <Mail size={16} className={`mt-0.5 shrink-0 ${BRAND}`} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">New email · Lumen Health</p>
            <Small>&ldquo;Invitation: technical interview on Tuesday&rdquo;</Small>
          </div>
          <span className={`hidden items-center gap-1 whitespace-nowrap text-[11px] font-semibold sm:inline-flex ${BRAND}`}>
            <Sparkles size={13} aria-hidden /> Interview invite · 94%
          </span>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {COLUMNS.map((column) => (
          <div
            key={column.key}
            // On phones the Saved column is left out so the two columns in the story have room.
            className={`min-h-[186px] flex-col gap-2 rounded-lg bg-ink/[0.04] p-2 ${column.key === "saved" ? "hidden sm:flex" : "flex"}`}
          >
            <div className="flex items-center gap-1.5 px-0.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: column.color }} />
              <span className="truncate text-xs font-semibold">{column.label}</span>
              <span className="ml-auto text-[11px] tabular-nums text-muted">
                {column.key === "applied" ? (moved ? 1 : 2) : column.key === "technical" ? (moved ? 1 : 0) : 1}
              </span>
            </div>
            {column.key === "saved" && <Card company="Orbit Studio" role="Full Stack Developer" color={STATUS.saved} label="Saved" />}
            {column.key === "applied" && (
              <>
                {!moved && lumen}
                <Card company="Brightline AI" role="AI Engineer" color={STATUS.applied} label="Applied" />
              </>
            )}
            {column.key === "technical" && moved && lumen}
          </div>
        ))}
      </div>

      {/* Interview slot: reserved height, appears last */}
      <div className="h-[58px]">
        {phase === 3 && (
          <Panel className="flex animate-demo-rise items-center gap-2.5">
            <CalendarClock size={16} className="shrink-0" style={{ color: STATUS.technical }} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">Tue 10:00 · Technical interview · Lumen Health</p>
              <Small>Added to Interviews, with a reminder the day before</Small>
            </div>
          </Panel>
        )}
      </div>
    </>
  );
}

/* ── Review: an email TrackJob wasn't sure about waits for one tap ──────────────────────────── */

function ReviewScene({ phase }: { phase: number }) {
  const accepted = phase >= 1;
  return (
    <>
      <Heading title="Review" subtitle="Changes TrackJob wasn't sure about wait here for one tap. Confident ones update the board on their own." />
      <Panel highlight={!accepted} className="grid gap-2">
        <div className="flex items-start gap-2">
          <Mail size={16} className={`mt-0.5 shrink-0 ${BRAND}`} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">Kestrel Pay · Senior React Developer</p>
            <Small>&ldquo;Next steps for your application&rdquo; · 2h ago</Small>
          </div>
          <Chip color={STATUS.technical}>62% sure</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted">Move to</span>
          <Chip color={STATUS.initial}>Initial interview</Chip>
          <span className="flex-1" />
          {accepted ? (
            <span className={`inline-flex animate-demo-rise items-center gap-1 font-semibold ${SUCCESS}`}>
              <CheckCircle2 size={16} aria-hidden /> Accepted · board updated
            </span>
          ) : (
            <span className="flex gap-1.5">
              <Chip color="rgb(var(--muted))">Dismiss · D</Chip>
              <Chip color={STATUS.offer} filled>
                Accept · A
              </Chip>
            </span>
          )}
        </div>
      </Panel>
      <Panel className="flex items-center gap-2 opacity-85">
        <Mail size={16} className="shrink-0 text-muted" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold">Atlas Cloud · Platform Engineer</p>
          <Small>&ldquo;Thanks for applying&rdquo; · new application?</Small>
        </div>
        <Chip color={STATUS.applied}>Applied</Chip>
      </Panel>
      <Panel className="flex items-center gap-2 border-dashed bg-transparent">
        <Sparkles size={16} className={`shrink-0 ${BRAND}`} aria-hidden />
        <p className="text-[11px] text-muted">This week: 14 job emails read, 11 updated the board on their own, 3 waited for you.</p>
      </Panel>
    </>
  );
}

/* ── Interviews: upcoming interviews, then the prep pack for the next one ───────────────────── */

const INTERVIEWS = [
  { time: "Tue 10:00", company: "Lumen Health", round: "Technical interview", icon: Video, kind: "Video · Join link" },
  { time: "Tue 15:30", company: "Kestrel Pay", round: "Initial interview", icon: Phone, kind: "Phone" },
];

const PREP_SECTIONS = [
  { title: "What to revise", count: 4 },
  { title: "Questions you'll likely get", count: 8 },
  { title: "Stories to tell (STAR)", count: 3 },
  { title: "Questions to ask them", count: 5 },
];

function InterviewsScene({ phase }: { phase: number }) {
  const prepOpen = phase >= 2;
  return (
    <>
      <Heading title="Interviews" subtitle="Found in your invites, in your time zone, with the link, an .ics file and a prep pack." />
      {INTERVIEWS.map((interview, order) => {
        const KindIcon = interview.icon;
        return (
          <Panel
            key={interview.company}
            highlight={prepOpen && order === 0}
            style={phase >= 1 ? { animationDelay: `${order * 0.18}s` } : undefined}
            className={`grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-2 ${phase >= 1 ? "animate-demo-rise" : "opacity-0"}`}
          >
            <span className="font-mono text-xs font-semibold">{interview.time}</span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                {interview.company} · {interview.round}
              </p>
              <Small className="flex items-center gap-1">
                <KindIcon size={13} aria-hidden />
                {interview.kind}
              </Small>
            </div>
            {order === 0 ? (
              <Chip color="var(--demo-brand)">
                <Sparkles size={12} aria-hidden /> Prep pack
              </Chip>
            ) : (
              <Chip color="rgb(var(--muted))">Write prep</Chip>
            )}
          </Panel>
        );
      })}

      {/* Prep slot: reserved height, the pack opens last */}
      <div className="h-[168px]">
        {prepOpen && (
          <Panel className="grid animate-demo-rise gap-2">
            <div className="flex items-baseline gap-2">
              <p className="text-[13px] font-semibold">Prep: Lumen Health</p>
              <Small>Technical interview · Frontend Engineer</Small>
            </div>
            <p className="line-clamp-2 text-[11px] text-muted">
              A patient-facing React team: expect questions on state, data fetching and accessibility. Lead with the dashboard you made
              faster.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {PREP_SECTIONS.map((section) => (
                <div key={section.title} className="flex items-center justify-between gap-2 rounded border border-edge px-2 py-1">
                  <span className="truncate text-[11px]">{section.title}</span>
                  <span className="rounded-full bg-ink/[0.07] px-1.5 text-[10px] font-semibold tabular-nums">{section.count}</span>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    </>
  );
}

/* ── Analytics: how the search is going, at a glance ───────────────────────────────────────── */

const STATS = [
  { label: "Applications", value: "24", hint: "plus 3 saved" },
  { label: "Response rate", value: "42%", hint: "10 got an answer" },
  { label: "Interview rate", value: "25%", hint: "6 reached one" },
  { label: "Time to an answer", value: "6 days", hint: "median" },
];

const FUNNEL = [
  { step: "Applied", count: 24, color: STATUS.applied },
  { step: "Got an answer", count: 10, color: STATUS.initial },
  { step: "Interview", count: 6, color: STATUS.technical },
  { step: "Offer", count: 1, color: STATUS.offer },
];

function AnalyticsScene({ phase }: { phase: number }) {
  const grown = phase >= 1;
  return (
    <>
      <Heading title="Analytics" subtitle="How your job search is going, from every application you've tracked." />
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {STATS.map((stat) => (
          <Panel key={stat.label} className="grid gap-0.5 p-2">
            <Small>{stat.label}</Small>
            <p className="font-mono text-lg font-semibold leading-tight">{stat.value}</p>
            <Small>{stat.hint}</Small>
          </Panel>
        ))}
      </div>
      <Panel className="grid gap-2">
        <div>
          <p className="text-[13px] font-semibold">Funnel</p>
          <Small>How far your applications got, at their furthest step</Small>
        </div>
        {FUNNEL.map((row, index) => (
          <div key={row.step} className="grid grid-cols-[96px_minmax(0,1fr)_28px] items-center gap-2">
            <span className="truncate text-[11px]">{row.step}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{ width: grown ? `${(row.count / FUNNEL[0].count) * 100}%` : "0%", background: row.color, transitionDelay: `${index * 120}ms` }}
              />
            </div>
            <span className="text-right font-mono text-[11px] tabular-nums text-muted">{row.count}</span>
          </div>
        ))}
      </Panel>
    </>
  );
}

/* ── Practice: today's steps, a coding problem solved in the browser ────────────────────────── */

const CODE = [
  "function roman(number) {",
  "  const map = [[1000, 'M'], [900, 'CM'], …];",
  "  let out = '';",
  "  for (const [value, numeral] of map)",
  "    while (number >= value) { out += numeral; number -= value; }",
  "  return out;",
  "}",
];

function PracticeScene({ phase }: { phase: number }) {
  const passed = phase >= 1;
  return (
    <>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">Today&apos;s practice</p>
          <Small>3 steps a day for your level · progress saved to your account</Small>
        </div>
        <Chip color={STATUS.technical}>
          <Flame size={13} aria-hidden /> {passed ? "4-day streak" : "3-day streak"}
        </Chip>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Coding", "Interview round", "Talk it through"].map((stepLabel, index) => {
          const done = index === 1 || index === 2 || (index === 0 && passed);
          return (
            <div key={stepLabel} className="min-w-0">
              <div className={`h-[5px] rounded-full transition-colors duration-500 ${done ? "bg-[#1F8A4C]" : BRAND_BG}`} />
              <Small className={`mt-1 ${index === 0 ? "font-semibold text-ink" : ""}`}>
                {done ? "✓ " : ""}
                {index + 1}. {stepLabel}
              </Small>
            </div>
          );
        })}
      </div>
      <Panel className="grid gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="mr-auto text-[13px] font-semibold">Roman Numerals</p>
          <Chip color="var(--demo-brand)">Online test</Chip>
          <Chip color="#C62F2F">No AI</Chip>
          <Chip color="rgb(var(--muted))">JavaScript</Chip>
        </div>
        <pre className="m-0 overflow-hidden whitespace-pre rounded bg-bg p-2 font-mono text-[11px] leading-[1.55] text-muted">{CODE.join("\n")}</pre>
        <div className="h-[22px]">
          {passed ? (
            <span className={`inline-flex animate-demo-rise items-center gap-1 text-xs font-semibold ${SUCCESS}`}>
              <CheckCircle2 size={16} aria-hidden /> All 27 tests passed · today&apos;s practice done
            </span>
          ) : (
            <Small className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${BRAND_BG} animate-demo-pulse`} />
              Running 27 tests in your browser…
            </Small>
          )}
        </div>
      </Panel>
    </>
  );
}

/* ── The window ─────────────────────────────────────────────────────────────────────────────── */

export default function TrackJobDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  // Auto-play moves through every screen; picking a tab stays on that screen (its own story still loops).
  const [autoPlay, setAutoPlay] = useState(true);
  const tabListRef = useRef<HTMLDivElement>(null);
  const scene = SCENES[sceneIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No animation: show each screen's finished state and let the tabs switch screens.
      const timer = setTimeout(() => setPhase(scene.phases.length - 1), 0);
      return () => clearTimeout(timer);
    }
    const phaseTimer = setTimeout(() => {
      if (phase < scene.phases.length - 1) return setPhase(phase + 1);
      setPhase(0);
      if (autoPlay) setSceneIndex((previousIndex) => (previousIndex + 1) % SCENES.length);
    }, scene.phases[phase]);
    return () => clearTimeout(phaseTimer);
  }, [phase, scene, autoPlay]);

  // On narrow screens the tabs scroll sideways: keep the current one in view without moving the page.
  useEffect(() => {
    const tabList = tabListRef.current;
    const activeTab = tabList?.children[sceneIndex] as HTMLElement | undefined;
    if (!tabList || !activeTab) return;
    const tabLeft = activeTab.getBoundingClientRect().left - tabList.getBoundingClientRect().left + tabList.scrollLeft;
    tabList.scrollTo({ left: tabLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2 });
  }, [sceneIndex]);

  function pick(index: number) {
    setAutoPlay(false);
    setSceneIndex(index);
    setPhase(0);
  }

  return (
    <section
      aria-label="TrackJob product demo"
      className="overflow-hidden rounded-[14px] border border-edge bg-bg shadow-lg [--demo-brand:#0C6E6B] dark:[--demo-brand:#48C8BA]"
    >
      {/* Window bar */}
      <div className="flex items-center gap-1.5 border-b border-edge bg-surface px-3 py-2">
        {["#E5534B", "#D4A72C", "#3FB950"].map((dotColor) => (
          <span key={dotColor} className="h-[9px] w-[9px] rounded-full opacity-80" style={{ background: dotColor }} />
        ))}
        <span className="ml-2 text-[11px] text-muted">TrackJob · {scene.label}</span>
        <span className={`ml-auto text-[10px] font-bold tracking-[0.08em] ${BRAND}`}>DEMO</span>
      </div>

      {/* Screen tabs, like the app's navigation; they scroll sideways on phones */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Screens"
        className="flex overflow-x-auto border-b border-edge [scrollbar-width:none] sm:grid sm:grid-cols-6 sm:overflow-visible"
      >
        {SCENES.map(({ id, label, icon: TabIcon }, index) => {
          const active = index === sceneIndex;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="trackjob-demo-screen"
              onClick={() => pick(index)}
              className={`relative flex shrink-0 items-center justify-center gap-1 whitespace-nowrap px-3 py-2 text-[11.5px] transition-colors hover:text-ink sm:px-1 ${
                active ? `font-bold ${BRAND}` : "font-medium text-muted"
              }`}
            >
              <TabIcon size={15} aria-hidden className="hidden md:inline-block" />
              {label}
              {active && <span className={`absolute inset-x-2 bottom-0 h-0.5 rounded ${BRAND_BG}`} />}
            </button>
          );
        })}
      </div>

      {/* Screen: fixed height so switching never resizes the window */}
      <div id="trackjob-demo-screen" role="tabpanel" aria-label={`${scene.label} screen`} className="h-[380px] overflow-hidden p-3">
        <div key={scene.id} className="grid animate-demo-rise content-start gap-2.5">
          {scene.id === "dashboard" && <DashboardScene phase={phase} />}
          {scene.id === "board" && <BoardScene phase={phase} />}
          {scene.id === "review" && <ReviewScene phase={phase} />}
          {scene.id === "interviews" && <InterviewsScene phase={phase} />}
          {scene.id === "analytics" && <AnalyticsScene phase={phase} />}
          {scene.id === "practice" && <PracticeScene phase={phase} />}
        </div>
      </div>

      {/* Which screen the tour is on */}
      <div aria-hidden className="flex gap-1 px-3 pb-2.5">
        {SCENES.map((tourScene, index) => (
          <span
            key={tourScene.id}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${index === sceneIndex ? BRAND_BG : "bg-edge"}`}
          />
        ))}
      </div>
    </section>
  );
}
