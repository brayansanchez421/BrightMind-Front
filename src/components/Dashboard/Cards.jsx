import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user/user.context.jsx';

const Cards = ({ isLeftBarVisible }) => {
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
    <div className="mx-6 mb-20">
      <div className="flex flex-wrap gap-4 w-full justify-center mt-16">
        <div className="bg-green-200 border-green-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full sm:w-48 h-48">
          <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosActivos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">Active users</h3>
            <p className="text-base font-medium">Active users on the platform</p>
          </div>
        </div>
        <div className="bg-red-200 border-red-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full sm:w-48 h-48">
          <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosInactivos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">Inactive Users</h3>
            <p className="text-base font-medium">Inactive users on the platform</p>
          </div>
        </div>
        <div className="bg-purple-200 border-purple-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full sm:w-48 h-48">
          <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.cursos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">Courses</h3>
            <p className="text-base font-medium">Courses available on the platform</p>
          </div>
        </div>
        <div className="bg-yellow-200 border-yellow-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full sm:w-48 h-48">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosRegistrados}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">Registered users</h3>
            <p className="text-base font-medium">Users registered on the platform</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-auto w-full md:w-4/5 sm:w-full lg:w-5/6 xl:w-4/6 h-full mt-10">
        <div className="bg-gradient-to-b from-indigo-700 to-indigo-400 rounded-lg shadow-md w-full p-8">
          <h2 className="text-4xl font-extrabold text-center text-white mb-6">Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl mb-4 text-gray-100">Active users</h3>
              <div className="relative w-12 h-24 bg-green-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-300 transition-all duration-700 ease-out" style={{ height: `${(stats.usuariosActivos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.usuariosActivos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl mb-4 text-white">Inactive users</h3>
              <div className="relative w-12 h-24 bg-red-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-red-300 transition-all duration-700 ease-out" style={{ height: `${(stats.usuariosInactivos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.usuariosInactivos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl mb-4 text-white">Courses</h3>
              <div className="relative w-12 h-24 bg-purple-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-300 transition-all duration-700 ease-out" style={{ height: `${(stats.cursos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.cursos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl mb-4 text-white">Registered users</h3>
              <div className="relative w-12 h-24 bg-yellow-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-500 to-yellow-300 transition-all duration-700 ease-out" style={{ height: `${(stats.usuariosRegistrados / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.usuariosRegistrados}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
