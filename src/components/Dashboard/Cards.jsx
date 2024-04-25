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

  return (
    
    <div className="flex flex-wrap justify-center gap-7">
      <div className="bg-green-200  border-green-400 border-2 p-6 rounded-lg shadow-md flex items-center justify-center h-56 w-80 hover:shadow-lg hover:bg-gray-100 transition duration-300">
        <div className="w-20 h-16 bg-green-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{stats.usuariosActivos}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Active users</h3>
          <p className="text-base">Active users on the platform</p>
        </div>
      </div>
      <div className="bg-red-200  border-red-400 border-2 p-6 rounded-lg shadow-md flex items-center justify-center h-56 w-80 hover:shadow-lg hover:bg-gray-100 transition duration-300">
        <div className="w-20 h-16 bg-red-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{stats.usuariosInactivos}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Inactive Users</h3>
          <p className="text-base">Inactive users on the platform</p>
        </div>
      </div>
      <div className="bg-blue-200  border-blue-400 border-2 p-6 rounded-lg shadow-md flex items-center justify-center h-56 w-80 hover:shadow-lg hover:bg-gray-100 transition duration-300">
        <div className="w-20 h-16 bg-blue-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{stats.cursos}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Courses</h3>
          <p className="text-base">Courses available on the platform</p>
        </div>
      </div>
      <div className="bg-yellow-200  border-yellow-400 border-2 p-6 rounded-lg shadow-md flex items-center justify-center h-56 w-80 hover:shadow-lg hover:bg-gray-100 transition duration-300">
        <div className="w-20 h-16 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{stats.usuariosRegistrados}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Registered users</h3>
          <p className="text-base">Users registered on the platform</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
