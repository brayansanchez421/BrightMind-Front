
import React, { useState, useRef, useEffect } from 'react';
import { BiSearch, BiUserCircle, BiMenu } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
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

    return (
        <nav className="py-2 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-sky-600">
            <div className="flex items-center justify-between lg:px-8">
                <div className="flex items-center">
                    <BiMenu className="text-white md:hidden mr-4" size="1.5em" onClick={() => setIsMenuVisible(!isMenuVisible)} />
                    <BiSearch className="hidden md:block text-white mr-2" size="1.5em" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="hidden md:block rounded-lg p-1 w-40"
                    />
                </div>

                <Link to="/Home" className="flex items-center ml-28">
                    <span className="text-white font-black text-2xl">Bright</span>
                    <img className="md:h-12 md:w-14" src={Logo} alt="Logo" />
                    <span className="text-white font-black text-2xl">Mind</span>
                </Link>
                


                <div className="flex items-center relative">
                <div className='flex'>
                <Link to="/MyCourses" className="cursor-pointer right-20 mt-1 text-white font-bold relative text-center justify-center text-[14px] w-[10em] h-[2em] bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-20 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Mis cursos
                </Link>
                </div>
                    <span className="text-white text-xl font-bold mr-4">{username}</span>
                    <Link 
                        to="/Account"
                        onMouseEnter={() => setIsMenuVisible(true)}
                        onMouseLeave={() => setIsMenuVisible(false)}
                    >
                        <img 
                            src={userImage || BiUserCircle} 
                            alt="User"
                            className="h-14 w-14 cursor-pointer border rounded-full mr-5"
                        />
                    </Link>
                    <div 
                        ref={menuRef}
                        onMouseEnter={() => setIsMenuVisible(true)}
                        onMouseLeave={() => setIsMenuVisible(false)}
                        className={`${
                            isMenuVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                        } absolute right-2 top-20 w-56 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-md transition-all duration-300 ease-in-out z-50`}
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
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
