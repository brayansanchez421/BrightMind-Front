import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './../components/Login_components/Carousel';
import { useAuth } from '../context/auth.context';
import VideoPage from './VideoPage';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login } = useAuth();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Valores enviados al hacer inicio de sesión:', values);
      try {
        setLoading(true);
        const { success, user } = await login(values);
        console.log('Inicio de sesión exitoso:', success);

        if (success) {
          const userRole = user && user.data ? user.data.role : null;
          const userToken = user && user.data ? user.data.token : null;
          console.log(userRole);

          toast.success('Inicio de sesión exitoso');
          document.cookie = 'token=' + userToken + '; path=/';
          setUserRole(userRole);
          setIsAuthenticated(true);
        } else {
          setError('An error occurred');
          toast.error('An error occurred');
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred');
        toast.error('An error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [error]);

  if (isAuthenticated) {
    return <VideoPage userRole={userRole} />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <Carousel />
      <ToastContainer />
      <div className="flex w-1/2 justify-center items-center">
        <div className="p-16 bg-white rounded-3xl shadow-2xl w-4/5">
          <div className="text-2xl w-36 mx-auto text-center font-black bg-gradient-to-r from-purple-500 to-emerald-400 py-3 rounded-xl text-white">Sign In</div>
          <div className="mb-5 mt-10 text-lg text-center font-semibold">Haven't you registered yet?
            <Link to="/register">
              <button className="text-xl text-pink-500 hover:text-pink-600 font-semibold hover:bg-red-100">
                -Register
              </button>
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold text-xl"
              disabled={!formik.isValid || loading}
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/reset"
              className="text-gray-600 hover:text-blue-600 font-bold text-lg"
              style={{ textDecoration: 'none' }}
            >
              ¿Have you forgotten your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
