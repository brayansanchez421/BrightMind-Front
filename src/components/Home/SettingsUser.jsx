import React from 'react';
import LanguagePreferences from '../Dashboard/ProfileAdmin/Languaje';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user/user.context';
import { useAuth } from '../../context/auth.context';
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

const SettingsBar = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();
  const { user } = useAuth();

  const handleDeleteAccount = async () => {
    MySwal.fire({
      title: t('settingsBar.are_you_sure'),
      text: t('settingsBar.cannot_undo'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('settingsBar.yes_delete_account'),
      cancelButtonText: t('settingsBar.cancel'),
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
            text: t('settingsBar.problem_deleting'),
          });
        }
      }
    });
  };

  return (
    <div className='flex justify-center'>
      <div className="mt-4 w-full bg-gradient-to-b from-violet-500 to-purple-800 rounded-lg shadow-md px-4">
        <h2 className="text-center font-black text-white p-3 text-lg md:text-xl">{t('settingsBar.account_settings')}</h2>
        <div className=''>
            <Link to="/ChangePasswordUser" className="block py-1 text-center text-white font-semibold px-4 rounded-lg hover:bg-cyan-700">
              {t('settingsBar.change_password')}
            </Link>
            <button onClick={handleDeleteAccount} className="w-full text-center text-white font-semibold py-1 px-4 rounded-lg hover:bg-red-700">
              {t('settingsBar.delete_account')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
