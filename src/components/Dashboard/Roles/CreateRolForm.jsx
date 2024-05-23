import  { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useRoleContext } from "../../../context/user/role.context"; // Importa el contexto de roles

const CreateRolForm = ({ visible, onClose }) => {
  const { createRole, rolesData } = useRoleContext(); // Obtiene la función createRole del contexto de roles
  const [role, setRole] = useState({ nombre: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("esto: ", role)
      await createRole(role);

      onClose(); 
      window.location.reload(); 

    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
    >
      <form onSubmit={handleSubmit} className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded ">
        <button
          className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400"
          onClick={onClose}
        >
          X
        </button>
        <div>
          <h1 className="text-4xl font-black text-center mb-4 text-white">Create Rol</h1>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Name: <br />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="text"
                name="nombre"
                value={role.nombre}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
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
    </Modal>
  );
};

export default CreateRolForm;