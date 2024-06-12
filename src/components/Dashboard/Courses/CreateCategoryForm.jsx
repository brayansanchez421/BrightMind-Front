import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCategoryContext } from "../../../context/courses/category.context";

const CreateCategoryForm = ({ visible, onClose }) => {
  const { createCategory } = useCategoryContext();

  const [category, setCategory] = useState({ name: "", description: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_DESCRIPCION_LENGTH = 100;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setCategory({ ...category, image: imageFile });
      setImagePreview(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", category);
    try {
      await createCategory(category);
      onClose();
      toast.success("Category created successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create category.");
      toast.error("Failed to create category.");
    }
  };

  useEffect(() => {
    if (visible) {
      setCategory({ name: "", description: "", image: null });
      setImagePreview(null);
      setErrorMessage("");
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      onCancel={onClose}
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      <form
        className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400"
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
                name="name"
                value={category.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Descripción: <br />
              <Input.TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                name="description"
                value={category.description}
                onChange={handleChange}
                maxLength={MAX_DESCRIPCION_LENGTH}
                style={{ minHeight: "100px" }}
              />
              <div className="text-white mt-1 text-right">{category.description.length}/{MAX_DESCRIPCION_LENGTH}</div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Imagen: <br />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-red-100"
              />
            </label>
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="preview" style={{ width: '100%', maxHeight: '200px' }} />
              </div>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex flex-col items-center"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ml-4 flex flex-col items-center"
            htmlType="submit"
          >
            Create Category
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategoryForm;
