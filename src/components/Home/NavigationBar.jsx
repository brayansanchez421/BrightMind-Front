import React, { useState } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/hola.png';
import { useAuth } from '../../context/auth.context.jsx';
import { Button } from 'antd';

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
                <div className="flex items-center">
                <button className="right-10 cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                   My courses
                   </button>
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
