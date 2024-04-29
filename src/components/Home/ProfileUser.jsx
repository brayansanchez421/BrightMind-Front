import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import SettingsBar from '../Home/SettingsUser';
import { useUserContext } from '../../context/user/user.context';

const UserProfileSettings = () => {
    const { getUserById, updateUser } = useUserContext();
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Reemplaza '_Id' con el ID real del usuario
                const user = await getUserById('_id');
                setUserData(user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [getUserById]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser('_id', userData);
            console.log('Datos de usuario actualizados con éxito');
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
            <NavigationBar />
            <div className="flex justify-center items-start">
                <div>
                    <SettingsBar />
                </div>
                <div className="md:w-3/12 mx-56 p-6 md:mt-36">
                    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-violet-500 to-fuchsia-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                defaultValue={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                defaultValue={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfileSettings;
