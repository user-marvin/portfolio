import { FileCode2, FileJson2, SquareCode } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="main-content common-main">
      <div className="skills about-me">
        <h1>About Me</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        molestiae tempore, doloribus culpa voluptas commodi inventore magnam
        minima, quia recusandae dignissimos explicabo ullam deserunt optio
        veritatis animi nostrum ducimus enim.
      </div>
      <div className="skills can-do">
        <h2>What I can do</h2>
        <div className="skills-container">
          <div className="icon">
            <FileCode2 size={35} />
          </div>
          <div className="description">
            <h4>Frontend Development</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus aspernatur ipsum, esse at recusandae corrupti
              veritatis, laborum dolore explicabo, magnam eaque. Dolorum,
              dolorem nemo harum dolore sequi tenetur eius dignissimos.
            </p>
          </div>
        </div>
        <div className="skills-container">
          <div className="icon">
            <FileJson2 size={35} />
          </div>
          <div className="description">
            <h4>Backend Development</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus aspernatur ipsum, esse at recusandae corrupti
              veritatis, laborum dolore explicabo, magnam eaque. Dolorum,
              dolorem nemo harum dolore sequi tenetur eius dignissimos.
            </p>
          </div>
        </div>
        <div className="skills-container">
          <div className="icon">
            <SquareCode size={35} />
          </div>
          <div className="description">
            <h4>Test Automation</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus aspernatur ipsum, esse at recusandae corrupti
              veritatis, laborum dolore explicabo, magnam eaque. Dolorum,
              dolorem nemo harum dolore sequi tenetur eius dignissimos.
            </p>
          </div>
        </div>
      </div>
      <div className="skills softskills">
        <h2>My Soft Skills</h2>
        <ul className="softskills-container">
          <li>
            <div className="skills-card">
              <h4>Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quis perferendis, ipsum adipisci assumenda consequatur, aut
                consectetur illum sunt facilis odio ea ullam itaque repellendus
                quod laboriosam unde tempore! Totam.
              </p>
            </div>
          </li>
          <li>
            <div className="skills-card">
              <h4>Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quis perferendis, ipsum adipisci assumenda consequatur, aut
                consectetur illum sunt facilis odio ea ullam itaque repellendus
                quod laboriosam unde tempore! Totam.
              </p>
            </div>
          </li>
          <li>
            <div className="skills-card">
              <h4>Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quis perferendis, ipsum adipisci assumenda consequatur, aut
                consectetur illum sunt facilis odio ea ullam itaque repellendus
                quod laboriosam unde tempore! Totam.
              </p>
            </div>
          </li>
          <li>
            <div className="skills-card">
              <h4>Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quis perferendis, ipsum adipisci assumenda consequatur, aut
                consectetur illum sunt facilis odio ea ullam itaque repellendus
                quod laboriosam unde tempore! Totam.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="skills about-me">
        <h2>What I'm doing</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        molestiae tempore, doloribus culpa voluptas commodi inventore magnam
        minima, quia recusandae dignissimos explicabo ullam deserunt optio
        veritatis animi nostrum ducimus enim.
      </div>
    </div>
  );
};

export default About;
