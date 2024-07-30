import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/user/user.context";
import { useAuth } from "../../../context/auth.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/img/hola.png";

const DeleteAccountConfirmation = () => {
  const navigate = useNavigate();
  const { deleteUserConfirmation } = useUserContext();
  const { user } = useAuth();

  const [confirmationCode, setConfirmationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleConfirmationCodeChange = (index, value) => {
    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;
    setConfirmationCode(newConfirmationCode);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = confirmationCode.join("");
    try {
      console.log("Confirmation code to send:", code);
      await deleteUserConfirmation(user.data.id, code);
      toast.success("Account deleted successfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Invalid or expired confirmation code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gradient-to-br from-violet-600 to-rose-500 py-6 px-6 rounded-xl shadow-xl shadow-pink-400"
      >
        <h1 className="text-center font-black text-5xl text-slate-100">
          Delete Account
        </h1>
        <p className="italic font-semibold text-center text-2xl text-slate-300 my-10">
          Enter the confirmation code sent to your email 📧
        </p>
        <div className="py-4 my-10 w-full flex justify-center">
          <img src={logo} alt="Logo" className="h-40" />
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-center items-center space-x-2">
            {confirmationCode.map((code, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="text"
                className="block w-10 h-10 bg-white text-center text-3xl rounded-lg border border-black focus:outline-red-500 focus:bg-zinc-200"
                maxLength="1"
                value={code}
                onChange={(e) =>
                  handleConfirmationCodeChange(index, e.target.value)
                }
                required
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-8 items-center mt-5">
          <button
            type="submit"
            className="w-32 py-3 font-medium text-white bg-red-950 shadow shadow-white hover:bg-red-800 rounded-lg"
          >
            <span>Delete</span>
          </button>
          <Link to={"/ProfileEditor"}>
            <button className="w-32 py-3 font-medium text-white bg-slate-950 shadow-white shadow hover:bg-gray-800 rounded-lg">
              <span>Cancel</span>
            </button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeleteAccountConfirmation;
