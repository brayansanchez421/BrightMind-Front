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
                setUserId(userData._id);
                setName(userData.username);
                setEmail(userData.email);
                
                if (userData.userImage) {
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
        <div className="md:mt-3 mt-5 mx-4 mb-2 flex border">
            <ToastContainer />
            <div className="max-w-lg mx-auto bg-gradient-to-b from-purple-500 to-blue-500 rounded-lg shadow-lg py-4 px-6 md:px-10">
                <h1 className="text-center font-black text-white md:text-3xl mb-6">Edit Profile</h1>
                {previewProfileImage && (
                    <div className="text-center">
                        <img src={previewProfileImage} alt="Preview" className="mt-4 w-20 h-20 rounded-full mx-auto mb-4" />
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-semibold text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-purple-300 focus:border-purple-300 hover:bg-gray-100"
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
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-purple-300 focus:border-purple-300 hover:bg-gray-100"
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
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-purple-300 focus:border-purple-300 hover:bg-gray-100"
                            onChange={handleImageChange}
                        />
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
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
