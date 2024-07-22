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
    <div className='flex justify-center'>
    <div className="w-full mx-2 sm:w-2/6  mt-4 py-2 bg-gradient-to-r from-violet-500 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
      <h2 className="text-center font-black text-lg md:text-2xl">Account Settings</h2>
      <ul className="">
        <li className="text-base font-bold mb-4">
          <Link to="/ChangePasswordUser" className="block py-1 px-4 rounded-lg hover:bg-cyan-700">
            Change Password
          </Link>
        </li>
        <li className="text-base font-bold">
          <button onClick={handleDeleteAccount} className="w-full text-left py-1 px-4 rounded-lg hover:bg-red-700 ">
            Delete Account
          </button>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default SettingsBar;
