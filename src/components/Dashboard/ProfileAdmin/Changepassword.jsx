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
        <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
        
                <LeftBar onVisibilityChange={handleLeftBarVisibilityChange} />
                <div className={`w-full transition-all duration-300 ${isLeftBarVisible ? 'ml-44' : ''}`}>
                    <Navbar />
                    <ToastContainer />
                    <div className="flex justify-center items-center mx-2 mt-20 sm:mt-10 mb-5">
                        <div className="bg-gradient-to-tl from-green-400 to-blue-500
                        p-4 rounded-3xl shadow-2xl w-full sm:w-5/6 md:w-7/12 lg:w-5/12"> 
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
                                <div className="flex justify-center items-center space-x-4">
                                    <button
                                        className={`w-48 font-bold py-2 text-lg text-white rounded-full ${passwordsMatch ? 'bg-green-700 hover:bg-green-600 shadow-green-400 shadow-orange' : 'bg-red-500 hover:bg-red-600 shadow-orange shadow-red-400'} disabled:opacity-80`}
                                        type="submit"
                                        disabled={!formik.isValid || !passwordsMatch}
                                    >
                                        Change password
                                    </button>
                                    <Link
                                        to="/ProfileEditor"
                                        className="text-white text-lg bg-slate-700 hover:bg-slate-600 shadow-orange shadow-sky-600 rounded-full font-bold w-48 text-center py-2 "
                                    >
                                        Return Settings
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Changepassword;
