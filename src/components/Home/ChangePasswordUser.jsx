import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Importa useParams
import { useUserContext } from '../../context/user/user.context';
import { useAuth } from '../../context/auth.context';
import { useTranslation } from 'react-i18next';

function NewPassword() {
    const { t } = useTranslation("global");
    const { token } = useParams(); // Obtiene el token de los parámetros de la URL
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { getUserById, changePassword } = useUserContext(); // Importa changePassword del contexto
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                if (user && user.data && user.data.id) {
                    const userData = await getUserById(user.data.id);
                    console.log("User data fetched:", userData);
                    setEmail(userData.email);
                }
            } catch (error) {
                console.error(t('newPasswordUser.fetch_email_error'), error);
            }
        };

        fetchUserEmail();
    }, [getUserById, user, t]);

    const validationSchema = yup.object().shape({
        password: yup.string().required(t('newPasswordUser.password_required')).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, t('newPasswordUser.password_invalid')),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('newPasswordUser.passwords_must_match')),
    });

    const formik = useFormik({
        initialValues: {
            email: email,
            password: '',
            confirmPassword: '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('Submitting with:', {
                    email,
                    newPassword: values.password,
                    confirmPassword: values.confirmPassword
                });
    
                await changePassword(email, values.password); // Asegúrate de que se está enviando `values.password` correctamente
                toast.success(t('newPasswordUser.password_changed_success'));
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                toast.error(t('newPasswordUser.password_change_error'));
                console.error('Error changing password:', error);
            }
        },
    });
    
    

    // Verificar si las contraseñas coinciden solo en el frontend
    useEffect(() => {
        setPasswordsMatch(formik.values.password === formik.values.confirmPassword);
    }, [formik.values.password, formik.values.confirmPassword]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
            <ToastContainer />
            <div className="flex w-1/2 mx-auto justify-center items-center">
                <div className="p-16 bg-white rounded-3xl shadow-2xl w-4/5 bg-gradient-to-r from-violet-600 to-rose-500">
                    <h2 className="text-5xl font-black text-center mb-10 text-white">{t('newPasswordUser.change_password')}</h2>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">{t('newPasswordUser.email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                readOnly
                                disabled
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder={t('newPasswordUser.email')}
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">{t('newPasswordUser.new_password')}</label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder={t('newPasswordUser.new_password')}
                            />
                            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">{t('newPasswordUser.confirm_password')}</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder={t('newPasswordUser.confirm_password')}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <button
                            type="submit"
                            className={`w-full py-4 px-8 font-medium text-white rounded-full text-xl ${passwordsMatch ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}
                            disabled={!formik.isValid || !passwordsMatch}
                        >
                            {t('newPasswordUser.change_password_button')}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link
                            to="/Account"
                            className="text-white hover:bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-red-300 font-semibold inline-flex space-x-1 items-center"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('newPasswordUser.return_to_settings')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
