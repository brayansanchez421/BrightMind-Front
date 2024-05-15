import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { useCategoryContext } from "../../context/courses/category.context";

const CreateCategoryForm = ({ visible, onClose }) => {
  const { createCategory } = useCategoryContext();

  const [category, setCategory] = useState({ name: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("esto: ", category);
      await createCategory(category);
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create category.");
    }
  };

  useEffect(() => {
    if (visible) {
      setCategory({ name: "" }); // Restablece el estado del formulario cuando se abre
    }
  }, [visible]);

  return (
    <Modal visible={visible} footer={null} closable={false}>
      <form
        className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded "
        onSubmit={handleSubmit}
      >
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
                name="name"
                value={category.name}
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
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex flex-col items-center"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline ml-4 flex flex-col items-center"
            onClick={handleSubmit}
          >
            Create Category
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategoryForm;
