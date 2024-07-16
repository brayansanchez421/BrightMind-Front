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
      // Verificar si el nombre del rol ya existe
      if (rolesData.some((existingRole) => existingRole.nombre === role.nombre)) {
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
      visible={visible}
      footer={null}
      closable={false}
      afterClose={() => setSuccessMessageVisible(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-xl relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Create Role</h1>
          <button
            type="button"
            onClick={handleModalClose}
            className="text-white hover:text-red-500 focus:outline-none"
            style={{ fontSize: "1.5rem" }}
          >
            &times;
          </button>
        </div>
        <div className="mb-6">
          <label
            htmlFor="nombre"
            className={`block text-sm font-medium ${
              error ? "text-red-500" : "text-white"
            } mb-2`}
          >
            Name:
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={role.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-2 placeholder-gray-300 bg-white border rounded-md focus:outline-none focus:ring-2 ${
              error ? "ring-red-500 border-red-500" : "ring-green-500 border-gray-300"
            }`}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">Please enter a role name</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleModalClose}
            className="inline-block px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            Create Role
          </button>
        </div>
      </form>

      {successMessageVisible && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          {message.success({
            content: "Role created successfully",
            duration: 3,
            onClose: handleModalClose,
          })}
        </div>
      )}
    </Modal>
  );
};

export default CreateRolForm;
