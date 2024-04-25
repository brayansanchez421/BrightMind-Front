import React, { useState } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import Logo from '../../assets/img/hola.png';

function NavigationBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

    // Función para manejar el clic en "Cerrar Sesión"
    const onLogout = () => {
        const handleLogout = async () => {
            try {
                // Lógica para cerrar sesión, como enviar una solicitud al servidor para invalidar la sesión
                // Aquí supongo que tienes una función de logout() que maneja esto
                await logout(); // Suponiendo que logout() es una función asíncrona que realiza la solicitud de cierre de sesión
                localStorage.removeItem('token'); // Elimina el token de acceso almacenado localmente
                window.location.href = '/'; // Redirige al usuario a la página de inicio
            } catch (error) {
                console.error('Error al hacer logout:', error);
            }
        };
        handleLogout(); // Llama a la función para manejar el cierre de sesión
    };

    return (
        <nav className="bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg shadow-pink-500 ">
            <div className="mx-auto flex items-center justify-between h-10">
                <div className="">
                    <img className="ml-4 h-10 w-auto" src={Logo} alt="Logo" />
                </div>
                <div className="flex items-center flex-1 sm:justify-center sm:flex-initial">
                    <BiSearch className="text-white mr-4" size="1.5em" /> {/* Reducido el tamaño del ícono a 1.5em */}
                    <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-lg p-1 sm:w-auto"
                    />
                </div>
                <div className="flex items-right">
                    <a className="text-white px-6 py-2 rounded-md text-base font-medium mr-4">Categories</a>
                    <Link to="/AboutUs" className="text-white px-6 py-2 rounded-md text-base font-medium mr-4">About Us</Link>
                    <a href="#" className="text-white px-6 py-2 rounded-md text-base font-medium mr-4">My Courses</a>
                    {/* Contenido del menú del avatar del usuario */}
                    <div className="relative">
                        <button onClick={() => setIsMenuVisible(!isMenuVisible)} >
                            <BiUserCircle className="text-white mr-4" size="40px" /> 
                        </button>
                        {/* Menú */}
                        <div className={`${isMenuVisible ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50`}>
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link to='/Account'>Account Settings</Link></li>
                                <li onClick={onLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Log Out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
