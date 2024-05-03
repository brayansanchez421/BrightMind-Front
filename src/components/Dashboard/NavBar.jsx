import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa'; // Importa el ícono de campana de react-icons
import SearchBar from './SearchBar.jsx';
import { useUserContext } from '../../context/user/user.context.jsx';
import { useAuth } from '../../context/auth.context.jsx'; 

const Navbar = ({ userImage, onLogout }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const { getUserById } = useUserContext(); 
  const { user } = useAuth(); 
  const [username, setUsername] = useState("Cargando...");

  const handleMenuClick = () => {
    // Esto alterna la visibilidad del menú desplegable
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const userData = await getUserById(user.data.id);
          setUsername(userData.username); 
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUsername();

    // Agregar event listener para cerrar el menú al hacer clic fuera de él
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [getUserById, user]);

  return (
    <nav className=" bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between"> {/* Ajusta py-3 aquí para aumentar la altura */}
      {/* Icono de campana y nombre de usuario */}
      <div className="flex items-center">
        <FaBell className="text-white mr-4 text-lg" /> {/* Icono de campana más grande */}
        <span className="text-white mr-4">{username}</span> {/* Nombre de usuario */}
      </div>
      {/* Barra de búsqueda */}
      <div className="flex items-center">
        <SearchBar/>
      </div>
      {/* Imagen de usuario */}
      <img
        src={userImage}
        alt="UserImage"
        className="h-8 w-8 rounded-full cursor-pointer"
        onClick={handleMenuClick}
      />
      {/* Menú desplegable */}
      <div ref={menuRef} className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50`}>
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={onLogout}>Go out</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Configure profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
