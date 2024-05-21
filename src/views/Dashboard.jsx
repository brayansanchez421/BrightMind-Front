import React from 'react';
import Cards from '../components/Dashboard/Cards';
import LeftBar from '../components/Dashboard/LeftBar';
import Navbar from '../components/Dashboard/NavBar';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      <div className="flex flex-1 overflow-hidden">
        <LeftBar />
        <div className='w-full'>
        <Navbar />      
        <div>
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
