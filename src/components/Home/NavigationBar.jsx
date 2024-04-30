import React, { useState } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/hola.png';
import { useAuth } from '../../context/auth.context.jsx';

function NavigationBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Error al hacer logout:', error);
        }
    };

    return (
        <nav className="fixed  top-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-pink-500 z-50">
            <div className="mx-auto flex items-center justify-between h-14">
                <div className="flex items-center">
                    <BiSearch className="text-white ml-4 mr-2" size="1.5em" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-lg p-1 w-40"
                    />
                </div>
                <div className="">
                    <img className="md:h-12 md:w-14 " src={Logo} alt="Logo" />
                </div>
                <div className="flex items-right">
                    <div className="relative">
                        <button onClick={() => setIsMenuVisible(!isMenuVisible)} >
                            <BiUserCircle className="text-white md:mr-10 hover:bg-orange-500 md:mt-2 " size="40px" /> 
                        </button>
                        <div className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-0 mt-4 w-48 bg-white shadow-md rounded-md z-50`}>
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link to='/Account'>Account Settings</Link></li>
                                <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Log Out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
