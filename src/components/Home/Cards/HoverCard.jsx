import React from 'react';

const HoverCard = ({ title, description, ruta, onClick }) => {
  return (
    <div 
      className="group cursor-pointer overflow-hidden bg-gradient-to-b from-purple-500 to-emerald-400 w-full rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 mb-10"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={ruta} 
          alt='Image Course Preview'
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 "></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 rounded-lg">
        <div className="text-center">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
