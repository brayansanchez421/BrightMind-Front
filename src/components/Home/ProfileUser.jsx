import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import NavigationBar from '../Home/NavigationBar';
import SettingsBar from '../Home/SettingsUser';
import { useUserContext } from '../../context/user/user.context';
import { useAuth } from '../../context/auth.context';
import 'react-toastify/dist/ReactToastify.css';

const UserProfileSettings = ({ name: initialName, email: initialEmail }) => {
    const { updateUserPartial, getUserById } = useUserContext();
    const { user } = useAuth();

    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [userId, setUserId] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [previewProfileImage, setPreviewProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (user && user.data && user.data.id) {
                try {
                    const userData = await getUserById(user.data.id);
                    setUserId(userData._id);
                    setName(userData.username);
                    setEmail(userData.email);

                    if (userData.userImage) {
                        setPreviewProfileImage(userData.userImage);
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserId();
    }, [getUserById, user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewProfileImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            try {
                const userData = {
                    username: name,
                    email,
                };

                if (profileImage) {
                    userData.userImage = profileImage;
                }

                await updateUserPartial(userId, userData);
                toast.success('Changes saved successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => window.location.reload(), // Añadido para recargar la página
                });
                
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

    const transformCloudinaryURL = (imageUrl) => {
        return imageUrl;
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen ">
            <NavigationBar />
            <div className="grid grid-cols-1">
                <div>
                    <SettingsBar />
                </div>
                    <ToastContainer />
                    <div className='flex justify-center mt-2 w-full'>
                    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg rounded-lg px-6 py-2 text-white lg:w-12/12 mx-2">
                        <div className="mb-4 text-center">
                            <h1 className="font-black text-white md:text-4xl text-2xl mb-6">Edit Profile</h1>
                            {previewProfileImage && (
                                <div className="mb-4">
                                    <img src={previewProfileImage} alt="Preview" className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-base font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-base font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profileImage" className="block text-lg font-semibold text-white">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
