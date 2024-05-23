import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCategoryContext } from "../../../context/courses/category.context";

const CreateCategoryForm = ({ visible, onClose }) => {
  const { createCategory } = useCategoryContext();

  const [category, setCategory] = useState({ name: "", description: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file.originFileObj);
    setCategory({ ...category, image: file.originFileObj });
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
      setCategory({ name: "", description: "", image: null });
      setImagePreview(null); // Restablece la previsualización de la imagen cuando se abre el formulario
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
          </div>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Descripción: <br />
              <Input.TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                name="description"
                value={category.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-zinc-100 text-lg font-medium mb-4">
              Imagen: <br />
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
              </Upload>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="preview" style={{ width: '100%', maxHeight: '200px' }} />
                </div>
              )}
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
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