import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Animation from "../assets/Video/Animation.mp4";
import Prueba from "../assets/Video/Prueba.mp4";


// Lista de videos disponibles
const videos = [Animation, Prueba];

const VideoPage = ({ userRole }) => {
  const navigate = useNavigate();
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userRole === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }, 3000); // Redirigir después de 3 segundos

    return () => clearTimeout(timer);
  }, [userRole, navigate]);

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
