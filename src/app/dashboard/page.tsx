import React from 'react';
import Sidebar from '@/components/sidebar';
const Dashboard: React.FC = () => {
  return (
    <main className='grid grid-rows-7 items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20'>
      <Sidebar />
    </main>
  );
};

export default Dashboard;