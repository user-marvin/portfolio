import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { getContent } from "@/sanity/content";
import { isCurrent, sectionNumber } from "@/lib/portfolio";

export default async function Home() {
  const content = await getContent();
  const { profile, featuredWork, experience, projects, skills, education } = content;

  // Sections without content are left out, and the rest are numbered in page order.
  const sections = [
    featuredWork.show && featuredWork.title ? { id: "featured", label: "Featured" } : null,
    projects.items.length > 0 ? { id: "projects", label: "Projects" } : null,
    experience.length > 0 ? { id: "experience", label: "Experience" } : null,
    skills.length > 0 ? { id: "stack", label: "Stack" } : null,
    education.certifications.length > 0 ? { id: "certifications", label: "Certifications" } : null,
    { id: "contact", label: "Contact" },
  ].filter((section) => section !== null);
  const numberOf = (id: string) => sectionNumber(sections.findIndex((section) => section.id === id));
  const shows = (id: string) => sections.some((section) => section.id === id);

  return (
    <div id="top" className="lg:flex">
      <Sidebar profile={profile} sections={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto grid max-w-[760px] gap-[88px] px-6 pb-20 pt-12 sm:px-7">
          <Hero content={content} />
          {shows("featured") && (
            <Featured work={featuredWork} job={experience.find((job) => isCurrent(job.period))} number={numberOf("featured")} />
          )}
          {shows("projects") && <Projects projects={projects} github={profile.github} number={numberOf("projects")} />}
          {shows("experience") && <Experience jobs={experience} number={numberOf("experience")} />}
          {shows("stack") && <Skills groups={skills} number={numberOf("stack")} />}
          {shows("certifications") && (
            <Certifications certifications={education.certifications} number={numberOf("certifications")} />
          )}
          <Contact profile={profile} number={numberOf("contact")} />
        </div>
      </main>
    </div>
  );
}
