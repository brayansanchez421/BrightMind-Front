import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/user/user.context";
import { useAuth } from "../../../context/auth.context";

const MySwal = withReactContent(Swal);

const SettingsBar = () => {
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();
  const { user } = useAuth();

  const handleDeleteAccount = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete account",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user.data.id);
          console.log("este es el usuario", user);
          console.log("ID del usuario:", user.data.id);

          navigate("/eliminatedCode");
        } catch (error) {
          console.error(error);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was a problem trying to delete the account. Please try again later.",
          });
        }
      }
    });
  };

  return (
    <div className=" mt-8 md:mt-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-lg shadow-md mx-4 px-4 ">
      <h2 className="text-center font-black text-white p-3 text-lg md:text-xl">
        Account Setting
      </h2>
        <Link
          to="/ChangePassword"
          className="py-1 text-base font-semibold text-white w-full hover:bg-slate-600 text-center block rounded-lg"
        >
          Change Password
        </Link>
      <Link 
      className="text-base py-1 mt-1 hover:bg-red-600 block text-center font-semibold  rounded-lg text-white"
      href="#" 
      onClick={handleDeleteAccount}
      >  
        Delete account
      </Link>
    </div>
  );
};

export default SettingsBar;
