import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { passwordReset } from '../../../api/auth'; // Implement this function in your API
import LeftBar from './../../Dashboard/LeftBar';
import Navbar from './../../Dashboard/NavBar';
import { useUserContext } from '../../../context/user/user.context';
import { useAuth } from '../../../context/auth.context';

function Changepassword() {
    const { token } = useParams(); // Get the token from the URL parameters
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { getUserById } = useUserContext();
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
                console.error('Error fetching user email:', error);
            }
        };

        fetchUserEmail();
    }, [getUserById, user]);

    const validationSchema = yup.object().shape({
        password: yup.string().required('The password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'The passwords must match'),
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
                await passwordReset({ email, password: values.password, confirmPassword: values.confirmPassword });
                toast.success('Password changed successfully');
                setTimeout(() => {
                    navigate('/ProfileEditor');
                }, 2000);
                console.log(values);
            } catch (error) {
                toast.error('There was an error changing the password');
                console.error(error);
            }
        },
    });

    useEffect(() => {
        setPasswordsMatch(formik.values.password === formik.values.confirmPassword);
    }, [formik.values.password, formik.values.confirmPassword]);

    const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

    const handleLeftBarVisibilityChange = (isVisible) => {
        setIsLeftBarVisible(isVisible);
    };

    return (
        <div className="flex max-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
            <div className="flex h-screen overflow-hidden flex-1">
                <LeftBar onVisibilityChange={handleLeftBarVisibilityChange} />
                <div className={`w-full transition-all duration-300 ${isLeftBarVisible ? 'ml-44' : ''}`}>
                    <Navbar />
                    <ToastContainer />
                    <div className="flex w-full mx-auto justify-center items-center mt-6 p-4 sm:p-6 lg:p-8">
                        <div className="p-4 sm:p-6 lg:p-6 bg-white rounded-3xl shadow-2xl w-full  max-w-lg bg-gradient-to-bl from-green-400 to-blue-500"> 
                            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-2 text-white">Change Password</h2>
                            <form onSubmit={formik.handleSubmit} className="py-4 sm:py-6 lg:py-10 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
                                <div>
                                    <label className="text-lg font-bold text-white block mb-2 sm:mb-4 mx-2 sm:mx-4">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        readOnly
                                        disabled
                                        className="w-full p-2 sm:p-3 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-none"
                                    />
                                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                </div>
                                <div>
                                    <label className="text-lg font-bold text-white block mb-2 sm:mb-4 mx-2 sm:mx-4">New password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-2 sm:p-3 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                        placeholder="New password"
                                    />
                                    {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                </div>
                                <div>
                                    <label className="text-lg font-bold text-white block mb-2 sm:mb-4 mx-2 sm:mx-4">Confirm password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-2 sm:p-3 border border-cyan-300 rounded-full mb-2 bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                        placeholder="Confirm password"
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                                </div>
                                {error && <div className="text-red-500">{error}</div>}
                                <div className="flex justify-between items-center">
                                    <button
                                        className={`w-32 sm:w-48 text-center block h-8 sm:h-10 mx-auto py-1 sm:py-2 font-medium text-sm text-white rounded-full ${passwordsMatch ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}
                                        type="submit"
                                        disabled={!formik.isValid || !passwordsMatch}
                                    >
                                        Change password
                                    </button>
                                    <Link
                                        to="/ProfileEditor"
                                        className="text-white bg-gradient-to-r from-green-600 to-green-500 shadow-orange shadow-sky-400 rounded-full font-semibold inline-flex space-x-1 items-center h-8 sm:h-10 mx-2 sm:mx-4 px-4 sm:px-6 py-1 sm:py-2"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Return Settings
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Changepassword;
