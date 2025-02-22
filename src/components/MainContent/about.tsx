import { FileCode2, FileJson2, SquareCode } from "lucide-react";
import Image from "next/image";
import Navigator from "../Navigator/navigator";

const About: React.FC = () => {
  return (
    <div className="main-content common-main">
      <Navigator />
      <div className="skills about-me">
        <h1>About Me</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          molestiae tempore, doloribus culpa voluptas commodi inventore magnam
          minima, quia recusandae dignissimos explicabo ullam deserunt optio
          veritatis animi nostrum ducimus enim.
        </p>
      </div>
      <div className="skills can-do">
        <h1>What I can do</h1>
        <div className="skills-container">
          <div className="icon">
            <FileCode2 size={35} />
          </div>
          <div className="description">
            <h4>Frontend Development</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Adipisci, dolor quis temporibus odio aliquid praesentium iure!
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
      <div className="skills tech-stack">
        <h1>Technology Experience</h1>
        <div className="rounded-2xl border border-[var(--onyx)] mt-2 py-3">
          <h2>Backend Skills</h2>
          <ul className="tech-list">
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  alt="java"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"
                  alt="nodejs"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original-wordmark.svg"
                  alt="nestjs"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg"
                  alt="spring"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original.svg"
                  alt="rest"
                  width={50}
                  height={50}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--onyx)] mt-2 py-3">
          <h2>Frontend Skills</h2>
          <ul className="tech-list">
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"
                  alt="react"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-line-wordmark.svg"
                  alt="vuejs"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                  alt="javascript"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                  alt="typescript"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
                  alt="html"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
                  alt="css"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg"
                  alt="tailwind"
                  width={50}
                  height={50}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--onyx)] mt-2 py-3">
          <h2>Database</h2>
          <ul className="tech-list">
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
                  alt="mysql"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg"
                  alt="hibernate"
                  width={50}
                  height={50}
                />
              </div>
            </li>
            <li>
              <div className="tech-card">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
                  alt="mongodb"
                  width={50}
                  height={50}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
