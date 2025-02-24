"use client";
import React, { useState } from "react";
import Navigator from "../Navigator/navigator";
import About from "./sections/about";
import Resume from "./sections/resume";
import Portfolio from "./sections/portfolio";
import Contact from "./sections/contact";

const MainContent: React.FC = () => {
  const [section, setSection] = useState<string>("aboutMe");
  return (
    <div className="main-content common-main">
      <Navigator setSection={setSection} section={section} />
      {section === "aboutMe" && <About />}
      {section === "resume" && <Resume />}
      {section === "portfolio" && <Portfolio />}
      {section === "contact" && <Contact />}
    </div>
  );
};

export default MainContent;
