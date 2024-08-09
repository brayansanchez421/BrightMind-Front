import React, { useEffect, useState } from 'react';
import Animation1 from "../assets/Video/Animation1.mp4";
import Animation2 from "../assets/Video/Animation2.mp4";
import Animation3 from "../assets/Video/Animation3.mp4";
import Animation4 from "../assets/Video/Animation4.mp4";

// Lista de videos disponibles
const videos = [Animation1, Animation2, Animation3, Animation4];

const VideoPage = () => {
  const [randomIndex, setRandomIndex] = useState(0);

  // Función para obtener un índice aleatorio diferente cada vez
  const getRandomIndex = () => {
    const newIndex = Math.floor(Math.random() * videos.length);
    setRandomIndex(newIndex);
  };

  useEffect(() => {
    getRandomIndex(); // Llamada inicial para seleccionar un video aleatorio al cargar el componente
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <video className="w-full h-full object-cover" autoPlay muted onEnded={getRandomIndex}>
        <source src={videos[randomIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;