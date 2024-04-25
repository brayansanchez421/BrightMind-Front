import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import React from 'react';

import { resetPasswordVerify } from '../../api/auth'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/img/hola.png';

const ResetPasswordVerifyForm = () => {
    const navigate = useNavigate();
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleCodeChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resetCode = codes.join('');
        try {
            const response = await resetPasswordVerify({ resetCode });
            toast.success('Código válido');
            setTimeout(() => {
                navigate('/newPassword');
            }, 3000);
        } catch (error) {
            console.error(error);
            toast.error('Código de recuperación inválido o expirado.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 min-h-screen flex">
            <div className="md:z-50 mx-auto my-3 max-w-full bg-gradient-to-r from-violet-600 to-rose-500 p-3 rounded-xl shadow-xl shadow-zinc-950">
                <h1 className="md:text-nowrap font-black py-16 text-5xl p-6 text-slate-100 rounded-xl w-6/12 mx-10">We sent you a code</h1>
                <p className="italic font-semibold text-center text-2xl text-slate-300 my-10">Enter the code you have received by email 📧</p>
                <div className="py-4 my-10 w-full flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-40" />
                </div>
                <form onSubmit={handleSubmit} className="my-3">
                    <div className="flex flex-col space-y-5">
                        <div className="flex justify-center items-center space-x-2">
                            {codes.map((code, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs.current[index]}
                                    type="text"
                                    className="block w-12 h-12 bg-white text-center text-3xl rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                                    maxLength="1"
                                    value={code}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-full md:w-96 mx-auto py-4 font-medium text-white bg-gradient-to-r from-cyan-300 to-cyan-800 rounded-lg inline-flex space-x-4 items-center justify-center"
                        >
                            <span>Confirm Code</span>
                        </button>
                        <p className="text-center text-slate-100 font-medium">
                            Haven’t you received the code?{' '}
                            <Link to="/reset" className="text-black hover:bg-gradient-to-r font-semibold from-teal-200 to-cyan-400 shadow-lg shadow-red-300 inline-flex space-x-1 items-center">
                                request a new one
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ResetPasswordVerifyForm;
