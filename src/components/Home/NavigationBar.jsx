import React, { useState, useRef, useEffect } from "react";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/hola.png";
import { useAuth } from "../../context/auth.context";
import { useUserContext } from "../../context/user/user.context";
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t } = useTranslation("global");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Estado para mostrar el modal de bienvenida
  const { logout, user } = useAuth();
  const { getUserById } = useUserContext();
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");

  const menuRef = useRef(null);
  const welcomeModalRef = useRef(null); // Referencia al modal de bienvenida

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.data && user.data.id) {
        try {
          const userData = await getUserById(user.data.id);
          setUsername(userData.username);
          setUserImage(userData.userImage);
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, [user, getUserById]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !welcomeModalRef.current?.contains(event.target) // No cerrar si el clic está dentro del modal de bienvenida
      ) {
        setIsMenuVisible(false);
        setShowWelcomeModal(false); // Ocultar el modal de bienvenida al cerrar el menú
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, welcomeModalRef]);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-pink-600 shadow-orange shadow-sky-300 p-2 md:p-3 flex justify-between items-center w-full">
      {/* Sección izquierda */}
      <div className="flex items-center">
        <BiSearch className="text-white " size="24px" />
        <input
          type="search"
          placeholder={t('navigationBar.search_placeholder')}
          className="mr-1 rounded-lg p-2 md:w-28 md:h-9 w-11 h-7 bg-purple-400 text-white placeholder-white focus:outline-none  border-2 border-transparent hover:border-white"
        />
        <Link
          to="/MyCourses"
          className="text-white font-semibold text-center w-28 h-7 md:w-28 md:h-9 md:text-base flex items-center justify-center bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 rounded-lg py-1 px-2 hover:bg-gradient-xy hover:animate-gradient-xy transition-all duration-300 shadow-md transform hover:scale-105"
        >
          {t('navigationBar.my_courses')}
        </Link>
      </div>

      {/* Sección central */}
      <div className="flex justify-center items-center md:mr-20">
        <Link to="/Home" className="flex justify-center items-center">
          <span className="text-white font-black text-xl md:text-2xl hidden sm:block">
            {t('navigationBar.bright')}
          </span>
          <img className="h-12 " src={Logo} alt="Logo" />
          <span className="text-white font-black text-xl md:text-2xl hidden sm:block">
            {t('navigationBar.mind')}
          </span>
        </Link>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center">
        <div
          className="relative text-white md:text-lg font-bold mr-2 md:mr-4 cursor-pointer text-base hidden sm:block"
          onMouseEnter={() => setShowWelcomeModal(true)}
          onMouseLeave={() => setShowWelcomeModal(false)}
        >
          {username}
          {showWelcomeModal && (
            <div
              ref={welcomeModalRef} // Referencia al modal de bienvenida
              className="absolute top-8 right-0 w-56 bg-white shadow-md rounded-sm p-4 z-50 "
              onMouseEnter={() => setShowWelcomeModal(true)} // Mantener el modal visible al estar encima
              onMouseLeave={() => setShowWelcomeModal(false)} // Ocultar al salir del modal
            >
              <p className="text-gray-800 mb-2">{t('navigationBar.welcome_message', { username })}</p>
              <p className="text-gray-600 mb-4">{t('navigationBar.check_courses')}</p>
              <Link
                to="/MyCourses"
                className="text-blue-600 font-semibold hover:underline"
              >
                {t('navigationBar.see_my_courses')}
              </Link>
            </div>
          )}
        </div>
        <img
          src={userImage || BiUserCircle}
          alt="User"
          className="h-12 md:h-12 w-12 md:w-12 cursor-pointer border rounded-full transition-all duration-300 hover:scale-110 mr-1"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        />
        {/* Menú desplegable */}
        {isMenuVisible && (
          <div
            ref={menuRef}
            className="absolute md:right-4 md:top-20 w-56 right-0 top-16 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-md transition-all duration-300 ease-in-out z-50"
          >
            <div className="flex flex-col py-2">
              <Link
                to="/Account"
                className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded transition-all duration-300"
              >
                {t('navigationBar.configure_profile')}
              </Link>
              <div
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded transition-all duration-300"
              >
                {t('navigationBar.logout')}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
