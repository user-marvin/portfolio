"use client";

import Image from "next/image";
import yin from "@/assets/img/0B2A7CA6-0528-4C43-90BB-CA1674434975.jpeg";
import MoreInfoBtn from "./more-info-button";
import MoreInfoText from "./more-info-text-button";
import { useState } from "react";
import Socials from "./socials";
import { Mail, MapPin, Phone, PhoneIncoming } from "lucide-react";
import Button from "./custom-components/Button";

const Sidebar: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = (): void => {
    setSidebarActive((prev: boolean) => !prev);
  };
  return (
    <div
      className={`sidebar common-main ${sidebarActive ? "sidebar-active" : ""}`}
    >
      <div className="sidebar-initial-content">
        <Image src={yin} alt="My image" className="avatar" />
        <div className="name-content">
          <h1 className="name">Marvin Villamar</h1>
          <h2 className="role">Full Stack Developer</h2>
        </div>
      </div>
      <MoreInfoBtn handleToggle={toggleSidebar} />
      <MoreInfoText handleToggle={toggleSidebar} />
      <div className="sidebar-more-info">
        <div className="separator" />
        <div className="contact-info">
          <div className="contact">
            <div className="icon-overflow">
              <div className="icon">
                <Mail size={18} />
              </div>
            </div>
            <div className="details">
              <h1>EMAIL</h1>
              <h1>villamar.marvin.b.8138@gmail.com</h1>
            </div>
          </div>
          <div className="contact">
            <div className="icon-overflow">
              <div className="icon">
                <Phone size={18} />
              </div>
            </div>
            <div className="details">
              <h1>PHONE</h1>
              <h1>+63 (955) 143 8976 </h1>
            </div>
          </div>
          <div className="contact">
            <div className="icon-overflow">
              <div className="icon">
                <PhoneIncoming size={18} />
              </div>
            </div>
            <div className="details">
              <h1>TELEPHONE</h1>
              <h1>(02) 8243 5022</h1>
            </div>
          </div>
          <div className="contact">
            <div className="icon-overflow">
              <div className="icon">
                <MapPin size={18} />
              </div>
            </div>
            <div className="details">
              <h1>ADDRESS</h1>
              <h1>Guiguinto, Bulacan, Philippines</h1>
            </div>
          </div>
        </div>
        <div className="hidden xl:block separator" />
        <div className="send-email">
          <Button variant="primary">Send Email</Button>
        </div>
        <div className="mt-4 text-center">
          <Button variant="secondary">Download Resume</Button>
        </div>
        <div className="separator" />
        <Socials />
      </div>
    </div>
  );
};

export default Sidebar;
