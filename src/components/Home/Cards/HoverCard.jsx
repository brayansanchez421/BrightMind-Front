import React from 'react';

const HoverCard = ({ title, description, ruta, onClick }) => {
  return (
    <div 
      className="md:relative group cursor-pointer overflow-hidden px-1 py-1  bg-gradient-to-b from-purple-500 to-emerald-400 w-full " 
      onClick={onClick}
    >
      <div>
        <div className="group-hover:scale-110 duration-500  mx-auto">
          <img 
            src={ruta} 
            alt='Image Course Preview'
            className="w-full h-56" 
            style={{ objectFit: 'cover' }} 
          />
        </div>
        <div className="absolute w-full h-56 left-0 -bottom-40 right-0 duration-200 group-hover:-translate-y-1/4">
          <div className="absolute -z-10 left-0 w-full h-full duration-500 group-hover:opacity-200 group-hover:bg-neutral-300">
            <span className="mt-2 text-lg font-black text-zinc-700 justify-center flex ">
              {title}
            </span>
            <p className=" w-full mt-4 text-sm  font-normal text-black px-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
