import { useState, useEffect, useRef } from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import { useUserContext } from '../../context/user/user.context.jsx';
import { useAuth } from '../../context/auth.context.jsx';
import { Link } from 'react-router-dom';
import LeftBar from './LeftBar';

const Navbar = () => {
  const { logout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const { getUserById } = useUserContext();
  const { user } = useAuth();
  const [username, setUsername] = useState("Cargando...");
  const [userImage, setUserImage] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.data && user.data.id) {
        try {
          const userData = await getUserById(user.data.id);
          setUsername(userData.username);
          if (userData.userImage) {
            setUserImage(userData.userImage);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();

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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <LeftBar onVisibilityChange={(isVisible) => setIsSidebarVisible(isVisible)} />
      <nav className="shadow-lg shadow-teal-200 bg-gradient-to-r from-teal-400 to-teal-500 py-3 flex items-center transition-all duration-400">
        <div className='absolute left-4'>
          <FaBars className="text-white text-lg cursor-pointer" onClick={toggleSidebar} />
        </div>
        <div className="flex-1 flex justify-center">
          <Link to="/admin" className="text-white text-2xl font-black">
            <h1>BrightMind</h1>
          </Link>
        </div>
        <div className="flex items-center absolute right-4">
          <div className="flex items-center mr-4">
            <span className="text-white text-xl font-bold">{username}</span>
          </div>
          <div className="relative">
            <img
              src={userImage}
              alt="UserImage"
              className="h-12 w-12 cursor-pointer mr-4 rounded-full"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
            {isMenuVisible && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-3 w-56 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-md transition-all duration-700"
              >
                <ul className="py-2">
                  <li className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded">
                    <Link to="/ProfileEditor">Configure profile</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded"
                    onClick={handleLogout}
                  >
                    Go out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
