import React, { useState } from 'react';
import LeftBar from './LeftBar';
import SettingsBar from './SettingsBar';
import ProfileForm from '../Dashboard/EditProfileForm';

const ProfileEditor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Enter your bio');
  const [avatar, setAvatar] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 " >

      <div className="flex h-screen overflow-hidden">

        {/* LeftBar */}
        <LeftBar />

        {/* ProfileForm and SettingsBar */}
        <div className="flex-1 flex">
          {/* SettingsBar */}
          <div>
            <SettingsBar />
          </div>
          
          {/* ProfileForm */}
          <div className="flex-1 mr-10 ml-10">
            <ProfileForm
              name={name}
              email={email}
              bio={bio}
              avatar={avatar}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handleBioChange={handleBioChange}
              handleAvatarChange={handleAvatarChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
