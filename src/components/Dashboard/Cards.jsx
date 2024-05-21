import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user/user.context.jsx'; 

const Cards = () => {
  const { usersData } = useUserContext(); 
  const [stats, setStats] = useState({
    cursos: 0,
    usuariosRegistrados: 0,
    usuariosActivos: 0,
    usuariosInactivos: 0,
  });

  useEffect(() => {
    const activeUsers = usersData.filter(user => user.state);
    const inactiveUsers = usersData.filter(user => !user.state);

    setStats({
      cursos: 10, 
      usuariosRegistrados: usersData.length,
      usuariosActivos: activeUsers.length,
      usuariosInactivos: inactiveUsers.length,
    });
  }, [usersData]);

  const maxUsers = Math.max(stats.usuariosRegistrados, stats.usuariosActivos, stats.usuariosInactivos, stats.cursos);

  return (
    <div className="container mx-auto p-8 flex flex-row items-start justify-center">
      <div className="flex flex-col items-center mr-8 p-6">
        <div className="bg-green-200 border-green-400 border-2 p-9 rounded-lg shadow-md mb-8 hover:shadow-lg hover:bg-gray-100 transition duration-300">
          <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">{stats.usuariosActivos}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Active users</h3>
            <p className="text-base">Active users on the platform</p>
          </div>
        </div>
        <div className="bg-red-200 border-red-400 border-2 p-8 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300">
          <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">{stats.usuariosInactivos}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Inactive Users</h3>
            <p className="text-base">Inactive users on the platform</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8 mb-8 mx-8" style={{ maxWidth: '100%', marginTop: '10px' }}>
        <h2 className="text-2xl font-bold mb-4 text-center">Statistics</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Active users</h3>
            <div className="w-6 bg-green-200 h-24 rounded-full overflow-hidden">
              <div className="bg-green-400 w-full" style={{ height: `${(stats.usuariosActivos / maxUsers) * 100}%` }}></div>
            </div>
            <p className="mt-4 text-base">{stats.usuariosActivos}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Courses</h3>
            <div className="w-6 bg-blue-200 h-24 rounded-full overflow-hidden">
              <div className="bg-blue-400 w-full" style={{ height: `${(stats.cursos / maxUsers) * 100}%` }}></div>
            </div>
            <p className="mt-4 text-base">{stats.cursos}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Inactive users</h3>
            <div className="w-6 bg-red-200 h-24 rounded-full overflow-hidden">
              <div className="bg-red-400 w-full" style={{ height: `${(stats.usuariosInactivos / maxUsers) * 100}%` }}></div>
            </div>
            <p className="mt-4 text-base">{stats.usuariosInactivos}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Registered users</h3>
            <div className="w-6 bg-yellow-200 h-24 rounded-full overflow-hidden">
              <div className="bg-yellow-400 w-full" style={{ height: `${(stats.usuariosRegistrados / maxUsers) * 100}%` }}></div>
            </div>
            <p className="mt-4 text-base">{stats.usuariosRegistrados}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center ml-8 p-6">
        <div className="bg-blue-200 border-blue-400 border-2 p-8 rounded-lg shadow-md mb-8 hover:shadow-lg hover:bg-gray-100 transition duration-300">
          <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">{stats.cursos}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Courses</h3>
            <p className="text-base">Courses available on the platform</p>
          </div>
        </div>
        <div className="bg-yellow-200 border-yellow-400 border-2 p-8 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">{stats.usuariosRegistrados}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Registered users</h3>
            <p className="text-base">Users registered on the platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
