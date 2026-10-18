import { Award } from "lucide-react";
import { splitCertification } from "@/lib/portfolio";
import SectionHeading from "./SectionHeading";

/** One card per certification: the full name and, when known, who issued it. */
export default function Certifications({ certifications, number }: { certifications: string[]; number: string }) {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="grid scroll-mt-6 gap-[22px]">
      <SectionHeading id="certifications-title" number={number} title="certifications" />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {certifications.map((certification) => {
          const { name, issuer } = splitCertification(certification);
          return (
            <li key={certification} data-reveal className="card grid content-start justify-items-center gap-1.5 px-4 py-5 text-center">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-lg bg-ink text-bg">
                <Award size={16} aria-hidden />
              </span>
              <strong className="text-sm font-medium">{name}</strong>
              {issuer && <span className="label">{issuer}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
