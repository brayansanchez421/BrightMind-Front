import React, { useState, useRef, useEffect } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/hola.png';
import { useAuth } from '../../context/auth.context';
import { useUserContext } from '../../context/user/user.context';

function NavigationBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Estado para mostrar el modal de bienvenida
    const { logout, user } = useAuth();
    const { getUserById } = useUserContext();
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');

    const menuRef = useRef(null);
    const welcomeModalRef = useRef(null); // Referencia al modal de bienvenida

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
                    setUserImage(userData.userImage);
                } catch (error) {
                    console.error('Error al obtener datos del usuario:', error);
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

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, welcomeModalRef]);

    return (
        <nav className="bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg p-2 md:p-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left section */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <BiSearch className="text-white" size="24px" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-lg p-1 w-24 md:w-36 h-6 bg-purple-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300 border-2 border-transparent hover:border-white"
                    />
                    <Link
                        to="/MyCourses"
                        className="text-white font-bold text-center text-sm md:text-lg bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 rounded-lg py-1 md:py-2 px-3 md:px-4 hover:bg-gradient-xy hover:animate-gradient-xy transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                        Mis Cursos
                    </Link>
                </div>

                {/* Logo */}
                <div className="flex items-center justify-center md:justify-start">
                    <Link to="/Home" className="flex items-center">
                        <span className="text-white font-black text-xl md:text-2xl">Bright</span>
                        <img className="h-10 md:h-12 ml-1 md:ml-2" src={Logo} alt="Logo" />
                        <span className="text-white font-black text-xl md:text-2xl">Mind</span>
                    </Link>
                </div>

                {/* Right section */}
                <div className="flex items-center relative">
                    <div
                        className="relative text-white text-lg font-bold mr-2 md:mr-4 hidden md:block cursor-pointer"
                        onMouseEnter={() => setShowWelcomeModal(true)}
                        onMouseLeave={() => setShowWelcomeModal(false)}
                    >
                        {username}
                        {showWelcomeModal && (
                            <div
                                ref={welcomeModalRef} // Referencia al modal de bienvenida
                                className="absolute top-8 right-0 bg-white border border-gray-200 shadow-md rounded-md p-4 z-50"
                                onMouseEnter={() => setShowWelcomeModal(true)} // Mantener el modal visible al estar encima
                                onMouseLeave={() => setShowWelcomeModal(false)} // Ocultar al salir del modal
                            >
                                <p className="text-gray-800 mb-2">¡Bienvenido, {username}!</p>
                                <p className="text-gray-600 mb-4">Revisa aquí tus cursos:</p>
                                <Link
                                    to="/MyCourses"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Ver Mis Cursos
                                </Link>
                            </div>
                        )}
                    </div>
                    <img
                        src={userImage || BiUserCircle}
                        alt="User"
                        className="h-8 md:h-10 w-8 md:w-10 cursor-pointer border rounded-full transition-all duration-300 hover:scale-110"
                        onClick={() => setIsMenuVisible(!isMenuVisible)}
                    />
                    {/* Menú desplegable */}
                    {isMenuVisible && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 top-16 w-48 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-md transition-all duration-300 ease-in-out z-50"
                        >
                            <div className="flex flex-col py-2">
                                <Link
                                    to="/Account"
                                    className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded transition-all duration-300"
                                >
                                    Configurar Perfil
                                </Link>
                                <div
                                    onClick={handleLogout}
                                    className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded transition-all duration-300"
                                >
                                    Salir
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
