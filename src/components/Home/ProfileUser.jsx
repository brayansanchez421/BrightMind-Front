import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import NavigationBar from "../Home/NavigationBar";
import SettingsBar from "../Home/SettingsUser";
import { useUserContext } from "../../context/user/user.context";
import { useAuth } from "../../context/auth.context";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const UserProfileSettings = ({ name: initialName, email: initialEmail }) => {
  const { t } = useTranslation("global");
  const { updateUserPartial, getUserById } = useUserContext();
  const { user } = useAuth();

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [deleteProfileImage, setDeleteProfileImage] = useState(false);

  // Validation states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      if (user && user.data && user.data.id) {
        try {
          const userData = await getUserById(user.data.id);
          setUserId(userData._id);
          setName(userData.username);
          setEmail(userData.email);

          if (userData.userImage) {
            setPreviewProfileImage(userData.userImage);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserId();
  }, [getUserById, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewProfileImage(URL.createObjectURL(file));
      setDeleteProfileImage(false); // Reset delete flag if new image is selected
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (name.length < 4) {
      setNameError(t("userProfileSettings.name_invalid"));
      isValid = false;
    } else {
      setNameError("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("userProfileSettings.invalid_email"));
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && userId) {
      try {
        const userData = {
          username: name,
          email,
          userImage: deleteProfileImage ? null : profileImage,
        };

        await updateUserPartial(userId, userData);
        toast.success(t("userProfileSettings.changes_saved_successfully"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        if (deleteProfileImage) {
          setProfileImage(null);
          setPreviewProfileImage(null);
          setDeleteProfileImage(false); // Reset flag after saving changes
        }
      } catch (error) {
        toast.error(t("userProfileSettings.failed_to_save_changes"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      console.error("Couldn't get user ID");
    }
    window.location.reload();
  };

  const handleDeleteImage = async () => {
    setProfileImage(null);
    setPreviewProfileImage(null);
    setDeleteProfileImage(true);
  };

  const transformCloudinaryURL = (imageUrl) => {
    return imageUrl;
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen ">
      <NavigationBar />
      <div className="flex justify-center 2xl:mt-20">
        <div className="grid grid-cols-1 lg:w-4/12">
          <SettingsBar className="" />
          <ToastContainer />
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-purple-500 to-violet-800 shadow-lg rounded-lg px-6 mt-2 text-white"
          >
            <div className="mb-4 text-center mt-4">
              <h1 className="font-bold text-white  text-2xl mb-6">
                {t("userProfileSettings.edit_profile")}
              </h1>
              {previewProfileImage && (
                <div className="mb-4">
                  <img
                    src={previewProfileImage}
                    alt="Preview"
                    className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-lg w-28 hover:bg-red-600 h-6 font-semibold"
                    onClick={handleDeleteImage}
                  >
                    {t("userProfileSettings.deleteImage")}
                  </button>
                </div>
              )}
            </div>
            <div className="mt-2">
              <label
                className="block text-white text-lg font-semibold "
                htmlFor="name"
              >
                {t("userProfileSettings.name")}
              </label>
              <input
                className={`border rounded w-full py-1 text-gray-800 text-sm ${
                  nameError ? "border-red-500" : ""
                }`}
                id="name"
                type="text"
                name="name"
                placeholder={t("userProfileSettings.name")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.length >= 4) {
                    setNameError("");
                  } else {
                    setNameError(t("userProfileSettings.name_invalid"));
                  }
                }}
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
            <div className="mt-2">
              <label
                className="block text-white text-lg font-semibold "
                htmlFor="email"
              >
                {t("userProfileSettings.email")}
              </label>
              <input
                className={`rounded w-full text-gray-800 py-1 text-sm ${
                  emailError ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                name="email"
                placeholder={t("userProfileSettings.email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailRegex.test(e.target.value)) {
                    setEmailError("");
                  } else {
                    setEmailError(t("userProfileSettings.invalid_email"));
                  }
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor="profileImage"
                className="block text-lg font-semibold text-white"
              >
                {t("userProfileSettings.profile_image")}
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className=" p-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex items-center justify-center mt-2 mb-2">
              <button
                className="bg-blue-600 px-4 py-2 hover:bg-blue-700 text-white font-medium rounded-lg"
                type="submit"
              >
                {t("userProfileSettings.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;
