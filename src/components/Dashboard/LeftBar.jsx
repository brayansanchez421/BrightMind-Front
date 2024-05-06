import  { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/hola.png';
import { useAuth } from '../../context/auth.context.jsx'; // Importa el contexto de autenticación

const LeftBar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const [logoutTimer, setLogoutTimer] = useState(null);
  const logoutTimerRef = useRef(logoutTimer);

  useEffect(() => {
    logoutTimerRef.current = logoutTimer;
  }, [logoutTimer]);

  const resetTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    setLogoutTimer(setTimeout(() => {
      handleLogout();
    }, 8 * 60 * 1000)); 
  };

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    resetTimer();

    const mouseMoveListener = document.addEventListener('mousemove', handleActivity);
    const keyPressListener = document.addEventListener('keypress', handleActivity);

    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      clearTimeout(logoutTimerRef.current);
    };
  }, []); 

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/');
      }, 5000); // Espera 5 segundos antes de redirigir al usuario al login
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };
  
  return (
    <div className=" bg-gradient-to-b from-purple-600 to-blue-600 text-white w- flex flex-col items-center justify-between w-2/12">
      <div className="-mt-10 mb-10 flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-80 " />
      </div>
      <div className="flex flex-col items-center w-full">
      
          <button className="py-4 px-6 text-left text-lg font-semibold hover:bg-purple-500 w-full transition duration-300">  <Link to="/admin">Start </Link></button>
        
        
          <button className="py-4 px-6 text-left text-lg font-semibold hover:bg-purple-600 w-full transition duration-300"><Link to="/usuarios">Users </Link></button>
        
        
          <button className="py-4 px-6 text-left text-lg font-semibold hover:bg-blue-700 w-full transition duration-300"><Link to="/cursos">Courses </Link></button>
        
        
        <button className='py-4 px-6 text-left text-lg font-semibold hover:bg-blue-800 w-full transition duration-300'><Link to="/Roles">Roles</Link></button>
        
        <button className="py-4 px-6 text-left text-lg font-semibold hover:bg-blue-900 w-full transition duration-300"> <Link to="/ProfileEditor">ProfileEditor</Link></button>
        
      </div>
      <div className="mt-auto w-full ">
        <button onClick={handleLogout} className="py-4 px-6 text-lg font-semibold hover:bg-red-500 w-full text-center transition duration-300">Sign off </button>
      </div>
    </div>
  );
};

export default LeftBar;
