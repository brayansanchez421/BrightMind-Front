import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Importa useParams
import { passwordReset } from '../../api/auth'; // Debes implementar esta función en tu API

function NewPassword() {
    const { token } = useParams(); // Obtiene el token de los parámetros de la URL
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('The email is required'),
        password: yup.string().required('The  password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'The passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await passwordReset(values);
                toast.success('Password changed successfully');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                console.log(values);
            } catch (error) {
                toast.error('There was an error changing the password');
                console.error(error);
            }
        },
    });

    // Verificar si las contraseñas coinciden
    useEffect(() => {
        setPasswordsMatch(formik.values.password === formik.values.confirmPassword);
    }, [formik.values.password, formik.values.confirmPassword]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
            <ToastContainer />
            <div className="flex w-1/2 mx-auto justify-center items-center ">
                <div className="p-16 bg-white rounded-3xl shadow-2xl w-4/5 bg-gradient-to-r from-violet-600  to-rose-500  ">
                    <h2 className="text-5xl font-black text-center mb-10 text-white ">Change Password</h2>
                    <form onSubmit={formik.handleSubmit} className="py-10 flex flex-col space-y-6">
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder="Email"
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">New password </label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder="New password"
                            />
                            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <div>
                            <label className="text-lg font-bold text-white block mb-4 mx-4">Confirm password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                placeholder="Confirm password "
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <button
                            type="submit"
                            className={`w-full py-4 px-8 font-medium text-white rounded-full text-xl  ${passwordsMatch ? 'bg-green-500 hover:bg-green-600 ' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}
                            disabled={!formik.isValid || !passwordsMatch}
                        >
                            Change password 
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link
                            to="/"
                            className="text-white hover:bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-red-300 font-semibold inline-flex space-x-1 items-center"
                            style={{ textDecoration: 'none' }}
                        >
                            Return to the login screen
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
