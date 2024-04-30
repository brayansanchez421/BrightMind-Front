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
        <nav className="fixed  py-1 top-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-sky-500 z-50">
            <div className="mx-auto flex items-center justify-between h-14">
                <div className="flex items-center">
                    <BiSearch className="text-white ml-4 mr-2" size="1.5em" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-lg p-1 w-40"
                    />
                </div>
                <div className="flex items-center hover:bg-orange-500 shadow-current ">
                    <span className='text-white font-black text-xl md:mx-2' >PLA</span>
                    <img className="md:h-12 md:w-14" src={Logo} alt="Logo" />
                    <span className='text-white font-black text-xl md:mx-2' >EDU</span>
                </div>
                <div className="flex items-right">
                    <button className="relative">
                        <BiUserCircle onClick={() => setIsMenuVisible(!isMenuVisible)} className="text-white md:mr-10 hover:bg-orange-500 md:mt-2" size="40px" /> 
                        <div className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-8 bg-gradient-to-r from-purple-700 to-pink-600 mt-4 w-48 shadow-md shadow-pink-300 rounded-md z-50`}>
                            <ul className="py-2">
                                <li className="px-4 py-2  text-left text-lg hover:bg-gray-500 text-white rounded"><Link to='/Account'>Account Settings</Link></li>
                                <li onClick={handleLogout} className="px-4 py-2 text-left text-lg text-white hover:bg-red-500 rounded">Log Out</li>
                            </ul>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
