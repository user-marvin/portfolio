"use client";

import Image from "next/image";
import yin from "@/assets/img/0B2A7CA6-0528-4C43-90BB-CA1674434975.jpeg";
import MoreInfoBtn from "./more-info-button";
import MoreInfoText from "./more-info-text-button";
import { useState } from "react";
import Socials from "./socials";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
            </div>
            <div className="details">
              <h1>ADDRESS</h1>
              <h1>Guiguinto, Bulacan, Philippines</h1>
            </div>
          </div>
        </div>
        <div className="separator" />
        <Socials />
      </div>
    </div>
  );
};

export default Sidebar;
