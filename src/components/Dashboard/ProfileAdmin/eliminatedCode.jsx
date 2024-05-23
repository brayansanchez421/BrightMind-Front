import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../../context/user/user.context";
import { useAuth } from "../../../context/auth.context"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/img/hola.png';

const DeleteAccountConfirmation = () => {
    const navigate = useNavigate();
    const { deleteUserConfirmation } = useUserContext();
    const { user } = useAuth(); 



    const [confirmationCode, setConfirmationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleConfirmationCodeChange = (index, value) => {
        const newConfirmationCode = [...confirmationCode];
        newConfirmationCode[index] = value;
        setConfirmationCode(newConfirmationCode);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = confirmationCode.join('');
        try {
            console.log("Código de confirmación a enviar:", code);
            await deleteUserConfirmation(user.data.id, code);
            toast.success('Cuenta eliminada correctamente');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error(error);
            setError('Código de confirmación inválido o expirado.');
            toast.error(error.response.data.msg);
        }
    };
    

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 min-h-screen flex">
            <div className="md:z-50 mx-auto my-3 max-w-full bg-gradient-to-r from-violet-600 to-rose-500 p-3 rounded-xl shadow-xl shadow-zinc-950">
                <h1 className="md:text-nowrap font-black py-16 text-5xl p-6 text-slate-100 rounded-xl w-6/12 mx-10">Delete Account</h1>
                <p className="italic font-semibold text-center text-2xl text-slate-300 my-10">Enter the confirmation code sent to your email 📧</p>
                <div className="py-4 my-10 w-full flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-40" />
                </div>
                <form onSubmit={handleSubmit} className="my-3">
                    <div className="flex flex-col space-y-5">
                        <div className="flex justify-center items-center space-x-2">
                            {confirmationCode.map((code, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs.current[index]}
                                    type="text"
                                    className="block w-12 h-12 bg-white text-center text-3xl rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                                    maxLength="1"
                                    value={code}
                                    onChange={(e) => handleConfirmationCodeChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-full md:w-96 mx-auto py-4 font-medium text-white bg-gradient-to-r from-red-300 to-red-800 rounded-lg inline-flex space-x-4 items-center justify-center"
                        >
                            <span>Delete Account</span>
                        </button>
                        <p className="text-center text-slate-100 font-medium">
                            If you want to keep your account,{' '}
                            <Link to="/ProfileEditor" className="text-black hover:bg-gradient-to-r font-semibold from-teal-200 to-cyan-400 shadow-lg shadow-red-300 inline-flex space-x-1 items-center">
                                go back to settings
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DeleteAccountConfirmation;