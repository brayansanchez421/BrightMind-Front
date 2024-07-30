import logo from '../../assets/img/hola.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { resetPasswordRequest } from '../../api/auth';
import { useTranslation } from 'react-i18next';

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("global");

    const validationSchema = yup.object().shape({
        email: yup.string().email(t('reset_password.invalid_email')).required(t('reset_password.email_required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await resetPasswordRequest(values);
                toast.success(t('reset_password.email_sent_success'));
                setTimeout(() => {
                    navigate('/code');
                }, 5000);
            } catch (error) {
                console.error(error);
                toast.error(t('reset_password.email_not_registered'));
            }
        },
    });

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 min-h-screen flex">
            <ToastContainer />
            <div className="md:z-50 mx-auto my-3 max-w-full bg-gradient-to-r from-violet-600 to-rose-500 p-3 rounded-xl shadow-xl shadow-zinc-950">
                <h1 className="md:text-nowrap font-black text-4xl p-3 text-slate-100 rounded-xl w-6/12 mx-28 py-8">{t('reset_password.forgot_password')}</h1>
                <p className="italic font-semibold text-center text-2xl text-slate-300 my-8 py-4 p-10 ">{t('reset_password.enter_email')}</p>
                <div className="my-8 w- flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-48" />
                </div>

                <form onSubmit={formik.handleSubmit} className="my-3">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="email">
                            <p className="font-medium text-zinc-200 pb-2 w-full sm:w-full md:w-96 mx-auto">{t('reset_password.email')}</p>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="block w-full sm:w-full md:w-96 mx-auto py-4 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder={t('reset_password.enter_registered_email')}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-white mx-56  ">{formik.errors.email}</div>
                        ) : null}

                        <button
                            type="submit"
                            className="w-full sm:w-full md:w-96 mx-auto py-4 font-medium text-white bg-gradient-to-r from-cyan-300 to-cyan-800 rounded-lg inline-flex space-x-4 items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                            <span>{t('reset_password.send_recovery_code')}</span>
                        </button>
                        <p className="text-center text-slate-100 font-medium">
                            {t('reset_password.not_registered_yet')}{' '}
                            <Link to="/register" className="text-black font-medium inline-flex space-x-1 items-center">
                                <span>{t('reset_password.register_now')}</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;