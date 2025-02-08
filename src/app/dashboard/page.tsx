import React from 'react';
import Sidebar from '@/components/Sidebar/sidebar';
import MainContent from '@/components/MainContent/main-content';

const Dashboard: React.FC = () => {
  return (
    <main className="p-[20px] pl-[10rem] pr-[10rem] grid grid-cols-7 gap-7">
      <Sidebar />
      <MainContent />
    </main>
  );
};

export default Dashboard;