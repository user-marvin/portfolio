import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import About from "@/components/MainContent/about";
import Navigator from "@/components/Navigator/navigator";

const Dashboard: React.FC = () => {
  return (
    <main className="page-container">
      <Sidebar />
      <About />
      <Navigator />
    </main>
  );
};

export default Dashboard;
