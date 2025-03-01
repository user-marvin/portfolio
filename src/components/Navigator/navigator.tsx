type NavigatorProps = {
  setSection: (section: string) => void;
  section: string;
};

const Navigator: React.FC<NavigatorProps> = ({ setSection, section }) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li
          onClick={() => setSection("aboutMe")}
          className={`${section === "aboutMe" ? "section-active" : undefined}`}
        >
          About
        </li>
        <li
          onClick={() => setSection("resume")}
          className={`${section === "resume" ? "section-active" : undefined}`}
        >
          Experience
        </li>
        <li
          onClick={() => setSection("portfolio")}
          className={`${
            section === "portfolio" ? "section-active" : undefined
          }`}
        >
          Portfolio
        </li>
        <li
          onClick={() => setSection("contact")}
          className={`${section === "contact" ? "section-active" : undefined}`}
        >
          Contact
        </li>
      </ul>
    </div>
  );
};

export default Navigator;
