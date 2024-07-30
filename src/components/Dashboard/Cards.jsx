import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user/user.context.jsx';
import { useCoursesContext } from '../../context/courses/courses.context.jsx';
import { useTranslation } from 'react-i18next';

const Cards = ({ isLeftBarVisible }) => {
  const { usersData } = useUserContext();
  const { courses } = useCoursesContext(); // Obtén los cursos desde el contexto
  const { t } = useTranslation("global");
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
      cursos: courses.length, // Actualiza el número de cursos
      usuariosRegistrados: usersData.length,
      usuariosActivos: activeUsers.length,
      usuariosInactivos: inactiveUsers.length,
    });
  }, [usersData, courses]); // Incluye `courses` en las dependencias

  const maxUsers = Math.max(stats.usuariosRegistrados, stats.usuariosActivos, stats.usuariosInactivos, stats.cursos);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 justify-center mt-10 mx-2">
        <div className="bg-green-200 border-green-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full">
          <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosActivos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">{t('cardsComponent.activeUsers')}</h3>
            <p className="text-base font-medium">{t('cardsComponent.activeUsersDescription')}</p>
          </div>
        </div>
        <div className="bg-red-200 border-red-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full">
          <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosInactivos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">{t('cardsComponent.inactiveUsers')}</h3>
            <p className="text-base font-medium">{t('cardsComponent.inactiveUsersDescription')}</p>
          </div>
        </div>
        <div className="bg-purple-200 border-purple-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full">
          <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.cursos}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">{t('cardsComponent.courses')}</h3>
            <p className="text-base font-medium">{t('cardsComponent.coursesDescription')}</p>
          </div>
        </div>
        <div className="bg-yellow-200 border-yellow-400 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex flex-col items-center w-full">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mt-6 mb-4">
            <span className="text-2xl font-black">{stats.usuariosRegistrados}</span>
          </div>
          <div className="text-center px-2">
            <h3 className="text-xl font-extrabold mb-2">{t('cardsComponent.registeredUsers')}</h3>
            <p className="text-base font-medium">{t('cardsComponent.registeredUsersDescription')}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-gradient-to-b from-indigo-700 to-indigo-400 rounded-lg shadow-md w-full lg:w-11/12 mb-6 py-4 mt-10 mx-2">
          <h2 className="text-4xl font-extrabold text-center text-white">{t('cardsComponent.statistics')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 text-center mt-10">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl text-gray-100">{t('cardsComponent.activeUsers')}</h3>
              <div className="relative mt-4 w-12 h-24 bg-green-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-300 transition-all duration-300 ease-out" style={{ height: `${(stats.usuariosActivos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.usuariosActivos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl text-white">{t('cardsComponent.inactiveUsers')}</h3>
              <div className="relative mt-4 w-12 h-24 bg-red-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-red-300 transition-all duration-300 ease-out" style={{ height: `${(stats.usuariosInactivos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.usuariosInactivos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl text-white">{t('cardsComponent.courses')}</h3>
              <div className="relative mt-4 w-12 h-24 bg-purple-200 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-300 transition-all duration-700 ease-out" style={{ height: `${(stats.cursos / maxUsers) * 100}%` }}></div>
              </div>
              <p className="mt-4 text-3xl text-gray-100">{stats.cursos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl text-white">{t('cardsComponent.registeredUsers')}</h3>
              <div className="relative mt-4 w-12 h-24 bg-yellow-200 rounded-lg overflow-hidden">
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
