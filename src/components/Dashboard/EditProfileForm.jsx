import React, { useState } from 'react';
import { useUserContext } from '../../context/user/user.context';
import userModel from '../../../../plataform-edu-back/src/models/user/user.model';

const ProfileForm = ({ name, email }) => {
    
      const handleSubmit async () => {
        
      }

    return (
        <div className="container mx-auto mt-10 md:mt-20 px-4 overflow-y-auto">
            <div className="max-w-lg mx-auto  bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-lg shadow-lg py-10 px-6 md:px-10">
                <h1 className="text-center font-black text-white text-4xl md:text-5xl mb-6">Edit Profile</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-semibold text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
                            value={name.userData}
                            
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
                            value={email. userData}
                            
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
    );
};

export default ProfileForm;
