import type { Profile } from "@/sanity/types";
import CopyEmail from "./CopyEmail";
import SectionHeading from "./SectionHeading";

export default function Contact({ profile, number }: { profile: Profile; number: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grid scroll-mt-6 gap-4 border-t border-line pt-8">
      <SectionHeading id="contact-title" number={number} title="contact" />
      <p className="font-mono text-[clamp(20px,3vw,28px)] leading-snug">Building something? Let&apos;s talk.</p>
      {profile.contactBlurb && <p className="text-soft">{profile.contactBlurb}</p>}
      <div className="flex flex-wrap items-center gap-2.5">
        <a href={`mailto:${profile.email}`} className="select-all font-mono text-ink">
          {profile.email}
        </a>
        <CopyEmail email={profile.email} />
      </div>
      <footer className="mt-12 flex flex-wrap justify-between gap-2 border-t border-line pt-5 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </footer>
    </section>
  );
}
