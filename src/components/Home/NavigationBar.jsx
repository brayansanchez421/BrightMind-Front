import React, { useState, useRef, useEffect } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/hola.png';
import { useAuth } from '../../context/auth.context';
import { useUserContext } from '../../context/user/user.context';

function NavigationBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { logout, user } = useAuth();
    const { getUserById } = useUserContext();
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');

    const menuRef = useRef(null);

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
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <nav className="bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-violet-300 p-1">
            <div className="flex items-center justify-between px-3">
                <div className="flex items-center space-x-4">
                    <BiSearch className="text-white" size="24px" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-lg p-1 w-36 h-6"
                    />
                    <Link
                        to="/MyCourses"
                        className="text-white font-bold text-center text-lg w-32 h-6 bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 rounded-lg  hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:bg-gradient-to-r before:from-violet-500 before:via-sky-500 before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        My Courses
                    </Link>
                </div>

                <div className="flex items-center justify-center mr-32">
                    <Link to="/Home" className="flex items-center">
                        <span className="text-white font-black text-xl">Bright</span>
                        <img className="md:h-12 md:w-14 " src={Logo} alt="Logo" />
                        <span className="text-white font-black text-xl">Mind</span>
                    </Link>
                </div>

                <div className="flex items-center relative">
                    <span className="text-white text-lg font-bold mr-4">{username}</span>
                    <img
                        src={userImage || BiUserCircle}
                        alt="User"
                        className="h-12 w-12 cursor-pointer border rounded-full"
                        onClick={() => setIsMenuVisible(!isMenuVisible)}
                    />
                    {isMenuVisible && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 top-16 w-56 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-md transition-all duration-300 ease-in-out z-50"
                        >
                            <div className="flex flex-col py-2">
                                <Link
                                    to="/Account"
                                    className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white rounded"
                                >
                                    Configure profile
                                </Link>
                                <div
                                    onClick={handleLogout}
                                    className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white rounded"
                                >
                                    Go out
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
