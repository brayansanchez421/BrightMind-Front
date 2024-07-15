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
  const MAX_DESCRIPTION_LENGTH = 100;

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
    if (!category.name || !category.description || !category.image) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await createCategory(category);
      toast.success("Category created successfully!", { autoClose: 1000 });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category. Please try again.");
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
        className="w-full p-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-lg relative"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-white hover:text-red-500 bg-red-400 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-white">Create Category</h1>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              Name: <br />
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-teal-300"
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              Description: <br />
              <Input.TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-teal-300"
                name="description"
                value={category.description}
                onChange={handleChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
                style={{ minHeight: "100px" }}
                required
              />
              <div className="text-gray-300 mt-1 text-right">{category.description.length}/{MAX_DESCRIPTION_LENGTH}</div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              Image: <br />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=" p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-teal-300 hover:bg-red-100"
                required
              />
            </label>
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img src={imagePreview} alt="preview" className="rounded-lg" style={{ maxWidth: "100%", maxHeight: "200px" }} />
              </div>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
