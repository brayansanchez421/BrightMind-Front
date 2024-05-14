import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const CreateRolForm = ({ visible, onClose, onCreate }) => {
  const [curso, setCurso] = useState({ nombre: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(curso);
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
                value={curso.nombre}
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
