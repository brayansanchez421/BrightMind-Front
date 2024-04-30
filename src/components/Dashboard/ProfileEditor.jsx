import React, { useState } from 'react';
import LeftBar from './LeftBar';
import SettingsBar from './SettingsBar';
import ProfileForm from '../Dashboard/EditProfileForm';

const ProfileEditor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
