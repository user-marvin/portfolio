import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import MainContent from "@/components/MainContent/main-content";

const Dashboard: React.FC = () => {
  return (
    <main className="page-container">
      <Sidebar />
      <MainContent />
    </main>
  );
};

export default Dashboard;
