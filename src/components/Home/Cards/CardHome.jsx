import React from 'react';

export function CardHome({ title, description, ruta, onClick }) {
  return (
    <div 
      className="w-80 h-96 bg-gradient-to-r from-purple-700 to-blue-400 rounded-3xl text-neutral-300 p-6 flex flex-col items-center justify-center gap-4 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
      onClick={onClick}
    >
      <div className="w-full h-48 rounded-2xl overflow-hidden">
        <img
          src={ruta}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center w-full">
        <p className="font-extrabold text-2xl">{title}</p>
      </div>
      <div>
        <p className="text-sm text-center">{description}</p>
      </div>
      <button 
        className="bg-green-500 font-extrabold p-2 px-6 rounded-xl hover:bg-green-600 transition-colors"
      >
        Register
      </button>
    </div>
  );
}

export default CardHome;
