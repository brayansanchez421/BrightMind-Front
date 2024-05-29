import React, { useState } from 'react';

const LanguagePreferences = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='text-left font-bold py-1 hover:bg-red-100 rounded-lg'><a href="#" onClick={handleOpenModal}>Language preferences</a></div>
    
      {showModal && (
        <div className="text-lg font-medium shadow-md text-center py-1 mt-1 rounded-md">
          <div className="modal-content text-white text-base mb-1 text-center mt-1 font-bold">
            <span className="close font-bold ml-48 mr-1 hover:bg-red-400" onClick={handleCloseModal}>&times;</span>
            <p>Select your preferred language</p>
          </div>
          <div className='mb-4 mt-4 text-sm'>
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

const SettingsBar = () => {
  return (
    <div>
      <ul>
        <li>
          <LanguagePreferences />
        </li>
      </ul>
    </div>  
  );
};

export default SettingsBar;
