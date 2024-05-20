import React from 'react';
import Cards from '../components/Dashboard/Cards';
import LeftBar from '../components/Dashboard/LeftBar';
import Navbar from '../components/Dashboard/NavBar';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      {/* Sidebar */}
      <LeftBar />
      {/* Contenido principal */}
      <div className="flex-1 flex-col   overflow-hidden">
        {/* Navbar */}
        <Navbar />
        {/* Contenido del dashboard */}
        <div className="flex-1 md:mt-20  py-10 mx-32  overflow-y-auto">
          {/* Estadísticas */}
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;