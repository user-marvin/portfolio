type Props = {
  class: string;
};
const Resume: React.FC<Props> = ({ class: section }) => {
  return (
    <div
      className={`section-container ${
        section === "resume" ? "section-active" : ""
      }`}
    >
      <h1 className="experience">Experience</h1>
      <div className="experience-container">
        <div className="dot" />
        <div className="content">
          <h1 className="job-title">Application Developer</h1>
          <h1 className="company">IBM Solutions Delivery Inc.</h1>
          <h2 className="year">2023-2024</h2>
          <p className="context">
            Migrated a full-stack application to a microservices-based system,
            modernizing the backend with Java EE 17 and Spring Boot 3, upgrading
            the frontend with Vue.js and Vite, and later developed React
            applications with TypeScript, integrated Nest.js APIs, and built
            scalable backend solutions using Node.js, TypeORM, and MySQL.
          </p>
        </div>
      </div>
      <div className="experience-container">
        <div className="dot" />
        <div className="content">
          <h1 className="job-title">Associate Software Engineer</h1>
          <h1 className="company">Accenture Inc.</h1>
          <h2 className="year">2022-2023</h2>
          <p className="context">
            Developed web services using REST APIs with a focus on clean,
            object-oriented code, built React.js applications with Redux,
            maintained test automation scripts using Cucumber and Selenium,
            contributed to team engagement activities, and completed a
            full-stack bootcamp in Java and React.
          </p>
        </div>
      </div>
      <div className="experience-container !border-none">
        <div className="dot" />
        <div className="content">
          <h1 className="job-title">
            Bachelor of Science in Information Technology
          </h1>
          <h2 className="year">2018-2022</h2>
          <p className="context">
            Graduated with Latin Honors, specializing in Web and Mobile
            Application Development. During his internship at Accenture, he
            developed a Web-Based Weekly Faculty Accomplishment Report
            Management System for his college using Python, Django RESTful API,
            React JS, Redux, HTML, CSS, JavaScript, and SQLite, utilizing tools
            such as Postman and React Developer Tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
