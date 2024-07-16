import React from 'react';
import LanguagePreferences from '../Dashboard/ProfileAdmin/Languaje';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user/user.context';
import { useAuth } from '../../context/auth.context';

const MySwal = withReactContent(Swal);

const SettingsBar = () => {
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();
  const { user } = useAuth();

  const handleDeleteAccount = async () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete account',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user.data.id);
          navigate('/eliminatedCode');
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was a problem trying to delete the account. Please try again later.',
          });
        }
      }
    });
  };

  return (
    <div className="w-80 mt-10 mx-auto bg-gradient-to-r from-violet-500 via-pink-500 to-red-500 rounded-lg shadow-lg text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <h2 className="text-center font-black p-4 text-lg md:text-2xl">Account Settings</h2>
      <ul className="list-none p-4">
        <li className="mb-4">
          <LanguagePreferences />
        </li>
        <li className="text-base font-bold mb-4">
          <Link to="/ChangePasswordUser" className="block py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition duration-300">
            Change Password
          </Link>
        </li>
        <li className="text-base font-bold">
          <button onClick={handleDeleteAccount} className="block w-full py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300">
            Delete Account
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsBar;
