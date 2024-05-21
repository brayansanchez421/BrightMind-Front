import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
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
    <nav className=" bg-teal-400 px-4 py-2 flex items-center justify-between shadow-lg shadow-teal-200 rounded-md border-l-2 border-teal-200  "> 
      <div className=" items-center">
        <FaBell className="text-white mr-4 text-lg ml-10 mt-1" /> 
        <span className="text-white mr-4 text-xl font-bold">{username}</span>
      </div >
      <Link to="/admin" className="text-white text-2xl font-black flex items-center justify-center h-full">
        <h1 className="m-0 flex justify-center  mr-8">BrightMind</h1>
      </Link>
      <img
        src={userImage}
        alt="UserImage"
        className="h-12 w-12 cursor-pointer mr-10  border "
        onClick={handleMenuClick}
      />
      <div ref={menuRef} className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-12 mt-52 w-56 bg-gradient-to-r from-purple-700 to-pink-600 shadow-orange shadow-teal-200 rounded-md `}>
        <ul className="py-2">
          <li className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded "><Link to="/ProfileEditor">Configure profile</Link></li>
          <li className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded" onClick={handleLogout}>Go out</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
