import React, { useState, useRef } from "react";
import { Modal, Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCoursesContext } from "../../../context/courses/courses.context";
import { useCategoryContext } from "../../../context/courses/category.context";

const { Option } = Select;

const CreateCourseForm = ({ visible, onClose, onCreate }) => {
  const { categories } = useCategoryContext(); // Obtiene la lista de categorías desde el contexto
  const { createCourse } = useCoursesContext(); // Obtiene la función para crear cursos desde el contexto
  const MAX_DESCRIPCION_LENGTH = 150;

  const [curso, setCurso] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const imagenRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCurso({ ...curso, imagen: file });
      setErrorMessage("");
    } else {
      e.target.value = null;
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curso.nombre || !curso.categoria || !curso.descripcion || !curso.imagen) {
      setErrorMessage("All fields are required.");
      return;
    }

    const courseData = {
      title: curso.nombre,
      category: curso.categoria,
      description: curso.descripcion,
      image: curso.imagen,
    };
    try {
      await createCourse(courseData);
      toast.success("Course created successfully!");
      setTimeout(() => {
        onCreate(courseData);
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        className="lg:absolute top-14 left-1/3"
        maskStyle={{ backdropFilter: "blur(10px)" }}
      >
        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg p-6 relative">
          <button
            className="absolute top-2 right-2 text-white hover:text-red-600 focus:outline-none"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white text-center mb-6">Create Course</h1>
            <div className="mb-4">
              <label className="block text-white text-base font-medium mb-2">
                Name:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1"
                  type="text"
                  name="nombre"
                  value={curso.nombre}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-base font-medium mb-2">
                Category:
                <Select
                  className="w-full mt-1"
                  style={{ borderRadius: "0.375rem" }}
                  value={curso.categoria}
                  onChange={(value) => setCurso({ ...curso, categoria: value })}
                  required
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-base font-medium mb-2">
                Description:
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1 resize-none"
                  name="descripcion"
                  value={curso.descripcion}
                  onChange={handleChange}
                  maxLength={MAX_DESCRIPCION_LENGTH}
                  style={{ minHeight: "100px" }}
                  required
                />
                <div className="text-gray-300 text-right mt-1">{curso.descripcion.length}/{MAX_DESCRIPCION_LENGTH}</div>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-lg font-bold mb-2">
                Image:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1"
                  type="file"
                  accept="image/*"
                  ref={imagenRef}
                  onChange={handleImagenChange}
                  required
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-500 mr-4"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-green-400 hover:bg-white text-white hover:text-green-400 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-500"
              type="submit"
            >
              Create Course
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateCourseForm;
