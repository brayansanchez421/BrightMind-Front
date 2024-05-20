import { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa'; // Importa el ícono de campana de react-icons
import { useUserContext } from '../../context/user/user.context.jsx';
import { useAuth } from '../../context/auth.context.jsx'; 
import { Link } from 'react-router-dom';


const Navbar = ({ userImage }) => {
  const { logout } = useAuth(); 

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const { getUserById } = useUserContext(); 
  const { user } = useAuth(); 
  const [username, setUsername] = useState("Cargando...");

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem('token');
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };

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
    <nav className=" bg-teal-400 px-4 py-3 flex items-center justify-between"> {/* Ajusta py-3 aquí para aumentar la altura */}
      {/* Icono de campana y nombre de usuario */}
      <div className="flex items-center">
        <FaBell className="text-white mr-4 text-xl ml-10 mt-1" /> {/* Icono de campana más grande */}
        <span className="text-white mr-4 text-2xl font-bold">{username}</span> {/* Nombre de usuario */}
      </div>
      {/* Imagen de usuario */}
      <img
        src={userImage}
        alt="UserImage"
        className="h-12 w-12 cursor-pointer mr-10  border "
        onClick={handleMenuClick}
      />
      {/* Menú desplegable */}
      <div ref={menuRef} className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-10 mt-48 w-56 bg-gray-400 shadow-orange shadow-red-400 rounded-md `}>
        <ul className="py-2">
          <li className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded "><Link to="/ProfileEditor">Configure profile</Link></li>
          <li className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded" onClick={handleLogout}>Go out</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
