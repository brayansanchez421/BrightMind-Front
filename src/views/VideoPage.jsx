// src/components/VideoPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Prueba from "../assets/Video/Animation.mp4";

const VideoPage = ({ userRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userRole === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }, 3000); // Redirigir después de 5 segundos

    return () => clearTimeout(timer);
  }, [userRole, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <video className="w-full h-full object-cover" autoPlay muted>
        <source src={Prueba} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;
