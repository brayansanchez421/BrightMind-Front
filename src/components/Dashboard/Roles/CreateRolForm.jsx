import React, { useState } from "react";
import { Modal, message } from "antd";
import { useRoleContext } from "../../../context/user/role.context";

const CreateRolForm = ({ visible, onClose }) => {
  const { createRole, rolesData } = useRoleContext();
  const [role, setRole] = useState({ nombre: "" });
  const [error, setError] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value.trim() });
    if (error && value.trim() !== "") {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.nombre.trim()) {
      setError(true);
      return;
    }
    try {
      if (
        rolesData.some((existingRole) => existingRole.nombre === role.nombre)
      ) {
        message.error({
          content: "Role name already exists",
          duration: 3,
        });
        return;
      }

      // Crear el nuevo rol
      await createRole(role);
      setSuccessMessageVisible(true);
      setTimeout(() => {
        setSuccessMessageVisible(false);
        onClose();
      }, 3000);
      setRole({ nombre: "" });
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleModalClose = () => {
    setSuccessMessageVisible(false);
    setRole({ nombre: "" });
    onClose();
  };

  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      visible={visible}
      footer={null}
      closable={false}
      maskStyle={{backdropFilter:"blur(10px)"}}
      
    >
      <div className="bg-gradient-to-tr from-teal-400 to-blue-500 shadow-lg rounded-lg p-6 ">
      <div className="">
        <h1 className="text-2xl text-center font-bold text-bold text-white">
          Create Role
        </h1>
      </div>
      <div className="mt-4">
        <label className="text-base font-semibold ml-2 ">Name:</label>
        <input
          value={role.nombre}
          onChange={handleChange}
          className="w-full py-2 border border-black focus-visible:ring rounded-md mt-2"
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">Please enter a role name</p>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Create Role
        </button>
        <button
          type="button"
          onClick={handleModalClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
      {successMessageVisible && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          {message.success({
            content: "Role created successfully",
            duration: 3,
            onClose: handleModalClose,
          })}
        </div>
      )}
      </div>
    </Modal>
  );
};

export default CreateRolForm;
