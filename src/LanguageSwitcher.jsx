import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');

  const handleToggle = () => {
    const newLang = isEnglish ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    setIsEnglish(!isEnglish);
  };

  return (
    <div className="fixed bottom-4 right-4 flex space-x-4 bg-white p-2 rounded-full shadow-md">
      <span className="text-gray-700">{isEnglish ? 'EN' : 'ES'}</span>
      <label className="flex items-center cursor-pointer">
        <span className="relative">
          <input
            type="checkbox"
            checked={isEnglish}
            onChange={handleToggle}
            className="sr-only"
          />
          <div className="block bg-gray-400 w-14 h-8 rounded-full"></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
              isEnglish ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </span>
      </label>
    </div>
  );
};

export default LanguageSwitcher;