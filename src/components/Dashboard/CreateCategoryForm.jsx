import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const CreateCategoryForm = ({ visible, onClose, onCreate }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() !== "") {
      // Aquí puedes manejar la lógica para crear una nueva categoría
      console.log("Nueva categoría:", { nombre: categoryName.trim() });
      onCreate({ nombre: categoryName.trim() }); // Llama a la función onCreate con los datos de la categoría
      onClose(); // Cierra el formulario después de la creación
    } else {
      setErrorMessage("Please enter a valid category name.");
    }
  };

  return (
    <Modal visible={visible} footer={null} closable={false}>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded "
      >
        <button
          className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        <div>
          <h1 className="text-4xl font-black text-center mb-4 text-white">
            Create Category
          </h1>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Nombre: <br />
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="text"
                value={categoryName}
                onChange={handleChange}
              />
            </label>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            type="submit"
          >
            Create Category
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategoryForm;
