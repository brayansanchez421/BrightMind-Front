import React from 'react';



const HoverCard = ({ title, description,ruta }) => {
  return (
    <div className='flex justify-center'>
<div className="relative group cursor-pointer overflow-hidden duration-500 w-80 h-100 p-5 mt-5 sm:mt-12 mx-auto lg:px-8 py-6 border border-gray-300 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-gray-50">
      <div>
        <div className="group-hover:scale-110 w-full h-64 bg-blue-400 duration-500">
          <img src={ruta} alt="Aqui va una" className="object-cover w-full h-full" />
        </div>
        <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
          <div className="absolute -z-10 left-0 w-80 h-80 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-purple-900"></div>
          <span className="text-xl font-black text-purple-600 ">{title}</span>
          <p className="group-hover:opacity-100 w-72 duration-500 opacity-0 ">
            {description}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HoverCard;
