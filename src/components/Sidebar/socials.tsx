import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Socials: React.FC = () => {
  return (
    <div className="socials-container contact">
      <div className="icon">
        <Link href={`https://www.linkedin.com/in/marvin-villamar-34103a235/`}>
          <Linkedin color={`hsl(0, 0%, 84%)`} />
        </Link>
      </div>
      <div className="icon">
        <Link href={`https://github.com/user-marvin`}>
          <Github color={`hsl(0, 0%, 84%)`} />
        </Link>
      </div>
    </div>
  );
};
export default Socials;
