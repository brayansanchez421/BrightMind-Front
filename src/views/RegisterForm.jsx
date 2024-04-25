import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../components/Login_components/Carousel";
import { Link, useNavigate  } from 'react-router-dom';
import { registerRequest } from "../api/auth";

function RegisterForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();


  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase, one lowercase, one number, and one special character"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...userData } = values;
        console.log("Values:", userData); 
  
        const response = await registerRequest(values);
        console.log("Response:", response.data); // Check response structure
  
        if (response && response.data && response.data.error && response.data.error === "Email already exists") {
          toast.error("Email already exists");
        } else {
          setSuccess(true);
          toast.success("User created successfully");
          setTimeout(() => { navigate('/'); }, 500);
        }
      } catch (error) {
        console.error(error);
        toast.error("Email already exists");
      }
    },
  });
  

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <Carousel />
      <ToastContainer />
      <div className="flex w-1/2 justify-center items-center">
        <div className="p-6 bg-white rounded-3xl shadow-2xl w-4/5">
        <div className="text-2xl w-36 mx-auto text-center font-black bg-gradient-to-r from-purple-500 to-emerald-400 py-3 rounded-xl text-white">Register</div>
          <div className="mb-5 mt-10 text-lg text-center font-semibold">¿Already registered? 
            <Link to="/">
              <button className="text-xl text-pink-500 hover:text-pink-600 font-semibold hover:bg-red-100">
                -Login
              </button>
            </Link>
          </div>
          
          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Enter username"
              />
              {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
            </div>
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </div>
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </div>
            <div>
              <label className="text-lg font-bold text-gray-600 block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-purple-300 rounded-full bg-purple-50 placeholder-purple-200 focus:outline-none focus:border-purple-500 focus:bg-white"
                placeholder="Repeat password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold text-xl"
              disabled={!formik.isValid || formik.values.password !== formik.values.confirmPassword}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
