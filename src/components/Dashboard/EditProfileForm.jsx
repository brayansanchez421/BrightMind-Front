import React from 'react';

const ProfileForm = ({ name, email, bio, avatar, handleNameChange, handleEmailChange, handleBioChange, handleAvatarChange }) => {
  return (
    <div className="container mx-auto mt-10 md:mt-20 px-4 overflow-y-auto">
      <div className="max-w-lg mx-auto  bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-lg shadow-lg py-10 px-6 md:px-10">
        <h1 className="text-center font-black text-white text-4xl md:text-5xl mb-6">Edit Profile</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
            value={name}
            onChange={handleNameChange}
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
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-lg font-semibold text-black">
            Bio
          </label>
          <textarea
            id="bio"
            rows={Math.max(4, Math.ceil(bio.length / 40))}
            className="mt-1 w-full min-h-[96px] border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
            value={bio}
            onChange={handleBioChange}
            style={{ resize: 'none' }} // Disable textarea resizing
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-lg font-semibold text-black">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="italic mt-1 p-3 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleAvatarChange}
          />
        </div>
        {avatar && (
          <div className="mb-4">
            <img src={avatar} alt="Avatar" className="w-28 h-28 rounded-full mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
