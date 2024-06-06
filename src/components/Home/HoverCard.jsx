import React from 'react';

const HoverCard = ({ title, description, ruta, onClick }) => {
  return (
    <div 
      className="relative border-2 border-b-gray-600 group cursor-pointer overflow-hidden lg:px-3 py-3 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-gray-50" 
      onClick={onClick}
    >
      <div>
        <div className="group-hover:scale-110 h-44 w-full duration-500">
          <img 
            src={ruta} 
            alt="Aqui va una" 
            className="object-cover w-full h-full" 
            style={{ objectFit: 'cover' }} 
          />
        </div>
        <div className="absolute w-full h-56 left-0 -bottom-20 right-0 duration-500 group-hover:-translate-y-1/4">
          <div className="absolute -z-10 left-0 w-full h-full duration-500 group-hover:opacity-100 group-hover:bg-stone-400">
            <span className="mt-2 text-xl font-black text-white justify-center flex duration-500 group-hover:opacity-100 opacity-0">
              {title}
            </span>
            <p className="group-hover:opacity-100 w-72 duration-500 opacity-0 mt-4 text-base ml-4 font-medium text-black">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
