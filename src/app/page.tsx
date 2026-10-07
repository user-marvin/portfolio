import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudy from "@/components/CaseStudy";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { getContent } from "@/sanity/content";

export default async function Home() {
  const { profile, featuredWork, experience, projects, skills, education } = await getContent();
  const showWork = featuredWork.show && featuredWork.title;

  return (
    <>
      <Nav
        shortName={profile.shortName}
        resumeUrl={profile.resumeUrl}
        sections={{
          work: Boolean(showWork),
          experience: experience.length > 0,
          projects: projects.items.length > 0 || projects.showMoreCard,
          skills: skills.length > 0,
        }}
      />
      <main id="top">
        <Hero profile={profile} />
        <About profile={profile} />
        {showWork && <CaseStudy work={featuredWork} />}
        {experience.length > 0 && <Experience jobs={experience} />}
        <Projects projects={projects} github={profile.github} />
        {skills.length > 0 && <Skills groups={skills} />}
        <Education education={education} />
        <Contact profile={profile} />
      </main>
    </>
  );
}
