import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../../context/user/user.context';
import { useAuth } from '../../../context/auth.context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = ({ name: initialName, email: initialEmail }) => {
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
                const userData = await getUserById(user.data.id);
                console.log("tra: ", userData)
                setUserId(userData._id);
                setName(userData.username);
                setEmail(userData.email);
                
                // Verificar si el usuario tiene una imagen de perfil almacenada
                if (userData.userImage) {
                    // Establecer la URL de la imagen almacenada como la vista previa de la imagen
                    setPreviewProfileImage(transformCloudinaryURL(userData.userImage));
                }
            }
        };

        fetchUserId();
    }, [getUserById, user]);

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

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            setProfileImage(imageFile);
            setPreviewProfileImage(URL.createObjectURL(imageFile));
        }
    };

    const transformCloudinaryURL = (imageUrl) => {
        return imageUrl; 
    };

    return (
        <div className="w-5/6 md:mt-32 overflow-hidden">
            <ToastContainer />
            <div className="max-w-lg mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-lg shadow-lg py-4 px-6 md:px-10">
                <h1 
                className="text-center font-black text-white md:text-3xl mb-6">Edit Profile
                {previewProfileImage && (
                <div className="">
                    <img src={previewProfileImage} alt="Preview" className="mt-4 w-20 h-20 rounded-full mx-auto mb-4" />
                </div>
                )}
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-semibold text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-semibold text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profileImage" className="block text-lg font-semibold text-black">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
                            onChange={handleImageChange}
                        />
                    </div>
                    
                    <div className="flex items-center justify-center">
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
    );
};

export default ProfileForm;
