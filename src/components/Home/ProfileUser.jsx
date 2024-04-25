import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import axios from 'axios';
import Languaje from './../Dashboard/Languaje';

const UserProfileSettings = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        bio: 'Enter your bio',
        avatar: '',
        avatarPreview: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleAutoResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setUserData({
            ...userData,
            avatar: file,
            avatarPreview: URL.createObjectURL(file)
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
            <div>
                <NavigationBar/>
            </div>
            <div className="max-w-md mx-auto p-4">
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
                            value={userData.name}
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
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                            Bio
                        </label>
                        <textarea
                            className="mt-1 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100 resize-none"
                            id="bio"
                            name="bio"
                            placeholder="Bio"
                            value={userData.bio}
                            onChange={handleInputChange}
                            onInput={handleAutoResize} // Ajuste dinámico del tamaño
                            style={{ minHeight: '96px', height: 'auto', overflowY: 'hidden' }}
                        />
                    </div>
                    <div className="md:mb-2">
                        <Languaje/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                            Avatar
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="avatar"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        {userData.avatarPreview && (
                            <img src={userData.avatarPreview} alt="Avatar Preview" className="mt-2 w-20" />
                        )}
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
    );
};

export default UserProfileSettings;
