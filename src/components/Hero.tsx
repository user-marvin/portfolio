import { ArrowRight, Github } from "lucide-react";
import type { Profile } from "@/sanity/types";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="pb-16 pt-32 sm:pb-20 sm:pt-44">
      <div className="container">
        {profile.location && <p className="eyebrow animate-rise">{profile.location}</p>}

        <h1 className="mt-5 animate-rise text-4xl font-semibold tracking-[-0.03em] [animation-delay:60ms] sm:text-6xl">
          {profile.shortName}
        </h1>
        <p className="mt-2 animate-rise text-2xl tracking-tight text-muted [animation-delay:60ms] sm:text-4xl">
          {profile.role}
        </p>

        <p className="mt-8 max-w-2xl animate-rise text-lg leading-relaxed text-muted [animation-delay:120ms]">
          {profile.headline}
          {profile.currently && (
            <>
              {" "}
              Currently building <span className="text-ink">{profile.currently}</span>.
            </>
          )}
        </p>

        <div className="mt-10 flex animate-rise flex-wrap items-center gap-3 [animation-delay:180ms]">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Get in touch <ArrowRight size={15} />
          </a>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              Résumé
            </a>
          )}
          {profile.github && (
            <div className="flex items-center">
              <span className="mr-2 h-5 w-px bg-line" aria-hidden />
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 text-muted transition hover:text-ink"
              >
                <Github size={18} />
              </a>
            </div>
          )}
        </div>

        {profile.stats.length > 0 && (
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="pr-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{s.value}</dd>
                <dd className="mt-1 max-w-[20ch] text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
