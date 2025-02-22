import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import About from "@/components/MainContent/about";

const Dashboard: React.FC = () => {
  return (
    <main className="page-container">
      <Sidebar />
      <About />
    </main>
  );
};

export default Dashboard;
