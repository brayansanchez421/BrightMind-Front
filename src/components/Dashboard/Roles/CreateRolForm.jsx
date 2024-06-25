import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { useRoleContext } from "../../../context/user/role.context"; // Importa el contexto de roles

const CreateRolForm = ({ visible, onClose }) => {
  const { createRole } = useRoleContext(); // Obtiene la función createRole del contexto de roles
  const [role, setRole] = useState({ nombre: "" });
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.nombre) {
      message.error("Por favor, digite un rol");
      return;
    }
    try {
      await createRole(role);
      setSuccessMessageVisible(true); // Mostrar el mensaje de éxito
      setTimeout(() => {
        setSuccessMessageVisible(false); // Ocultar el mensaje después de 3 segundos
        onClose(); // Cerrar el modal después de crear el rol
      }, 3000);
      setRole({ nombre: "" }); // Limpiar el estado del formulario
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleModalClose = () => {
    setSuccessMessageVisible(false); // Ocultar el mensaje si se cierra el modal
    setRole({ nombre: "" }); // Limpiar el estado del formulario
    onClose(); // Cerrar el modal
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      afterClose={() => setSuccessMessageVisible(false)} // Asegurar que se oculte el mensaje después de cerrar el modal
    >
      <form
        onSubmit={handleSubmit}
        className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded"
      >
        <button
          className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400"
          onClick={handleModalClose}
        >
          X
        </button>
        <div>
          <h1 className="text-4xl font-black text-center mb-4 text-white">
            Create Rol
          </h1>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Name: <br />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="text"
                name="nombre"
                value={role.nombre}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleModalClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            type="submit"
          >
            Create Rol
          </button>
        </div>
      </form>

      {/* Mostrar mensaje de éxito */}
      {successMessageVisible && (
        message.success({
          content: "Rol creado exitosamente",
          duration: 3, // Duración en segundos que se muestra el mensaje
          onClose: handleModalClose, // Cerrar el modal después de mostrar el mensaje
        })
      )}
    </Modal>
  );
};

export default CreateRolForm;
