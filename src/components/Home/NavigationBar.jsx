import React, { useState } from 'react';
import { BiSearch, BiUserCircle, BiMenu } from 'react-icons/bi';
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
        <nav className="fixed py-2 top-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-sky-500 z-50">
            <div className="mx-auto flex items-center justify-between md:h-14 md:px-4 lg:px-8">
                <div className="flex items-center">
                    <BiMenu className="text-white md:hidden mr-4" size="1.5em" onClick={() => setIsMenuVisible(!isMenuVisible)} />
                    <BiSearch className="hidden md:block text-white mr-2" size="1.5em" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="hidden md:block rounded-lg p-1 w-40"
                    />
                </div>
                <Link to="/Home" className="flex items-center">
                    <span className='text-white font-black text-xl md:mx-2' >PLA</span>
                    <img className="md:h-12 md:w-14" src={Logo} alt="Logo" />
                    <span className='text-white font-black text-xl md:mx-2' >EDU</span>
                </Link>
                <div className="flex items-center">
                    <Link to='/MyCourses' className="hidden md:block">
                        <button className="mr-4 text-white text-lg font-semibold hover:bg-orange-500 px-4 py-1 rounded-md ">
                            My Courses
                        </button>
                    </Link>
                    <BiUserCircle className="text-white md:mr-10 hover:bg-orange-500 rounded" size="40px" onClick={() => setIsMenuVisible(!isMenuVisible)} />
                </div>
            </div>
            <div className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-0  md:mt-4 md:mr-8 bg-gradient-to-r from-purple-700 to-pink-600 w-48 text-white text-center py-2 rounded-md shadow-lg`}>
                <Link to='/Account' className="block py-2 hover:bg-gray-500">Account Settings</Link>
                <button onClick={handleLogout} className="block py-2 hover:bg-red-500 text-center">Log Out</button>
            </div>
        </nav>
    );
}

export default NavigationBar;
