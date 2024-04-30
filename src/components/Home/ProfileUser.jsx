import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import NavigationBar from '../Home/NavigationBar';
import SettingsBar from '../Home/SettingsUser';
import { useUserContext } from '../../context/user/user.context';
import { useAuth } from '../../context/auth.context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfileSettings = ({ name: initialName, email: initialEmail }) => {
    const { updateUserPartial, getUserById } = useUserContext();
    const { user, logout } = useAuth();

    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (user && user.data && user.data.id) {
                try {
                    const userData = await getUserById(user.data.id);
                    setUserId(userData._id);
                    setName(userData.username);
                    setEmail(userData.email);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserId();
    }, [getUserById, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            try {
                await updateUserPartial(userId, { username: name, email });
                toast.success('Changes saved successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Cerrar sesión después de actualizar exitosamente
                await logout(); // Esperar a que la sesión se cierre antes de recargar la página
                localStorage.removeItem('token');
                window.location.reload();
            } catch (error) {
                toast.error('Failed to save changes. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            console.error("Couldn't get user ID");
        }
    };
    

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
            <NavigationBar />
            <div className="flex justify-center items-start">
                <div>
                    <SettingsBar />
                </div>

                <div className="mx-36 p-6 md:mt-36 w-5/12">
                    <ToastContainer />  
                    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-violet-500 to-fuchsia-400 shadow-lg shadow-pink-400 rounded px-10 pt-6 pb-8 mb-4 md:w-full ">
                        <div className="mb-4">
                        <h1 className="text-center font-black text-white md:text-4xl mb-6">Edit Profile</h1>
                            <label className="block text-black text-base font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-black text-base font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
