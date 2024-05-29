import React from 'react';
import LanguagePreferences from './Languaje';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../../context/user/user.context";
import { useAuth } from "../../../context/auth.context";

const MySwal = withReactContent(Swal);

const SettingsBar = () => {
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();
  const { user } = useAuth(); 

  const handleDeleteAccount = async () => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar cuenta',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user.data.id);
          console.log("este es el usuario", user)
          console.log("ID del usuario:",user.data.id);

          navigate('/eliminatedCode'); 
        } catch (error) {
          console.error(error);
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al intentar eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    });
  };

  return (
    <div className="w-96 mt-56 md:ml-48  bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-lg shadow-md shadow-rose-400 md:px-10 py-4">
      <h2 className="text-center font-black text-white p-3 text-lg md:text-xl">Account Setting</h2>
      <ul className="list-disc pl-2 md:pl-4">
        <li className=''>
          <LanguagePreferences/>
        </li>
        <li className="text-base hover:bg-cyan-400 py-1 font-bold mt-1 rounded-lg">
          <Link to="/ChangePassword">Change Password</Link>
        </li>
        <li className='text-base mt-1 hover:bg-red-600 py-1 font-bold rounded-lg'>
          <a href="#" onClick={handleDeleteAccount}>Delete account</a>
        </li>
      </ul>
    </div>
  );
};

export default SettingsBar;
