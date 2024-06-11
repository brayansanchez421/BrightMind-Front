import React, { useState, useRef } from "react";
import { Modal, Button, Input, Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCoursesContext } from "../../../context/courses/courses.context";
import { useCategoryContext } from "../../../context/courses/category.context";

const { Option } = Select;

const CreateCourseForm = ({ visible, onClose, onCreate }) => {
  const { categories } = useCategoryContext();
  const { createCourse } = useCoursesContext();

  const [curso, setCurso] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen: null,
    recurso: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const imagenRef = useRef(null);
  const recursoRef = useRef(null);

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

  const handleRecursoChange = (e) => {
    const file = e.target.files[0];
    setCurso({ ...curso, recurso: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title: curso.nombre,
      category: curso.categoria,
      description: curso.descripcion,
      content: curso.recurso,
      image: curso.imagen,
    };
    try {
      console.log(courseData)

      await createCourse(courseData);
      onCreate(courseData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal visible={visible} footer={null} closable={false}>
        <form onSubmit={handleSubmit} className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded">
          <button className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400" onClick={onClose}>
            X
          </button>
          <div>
            <h1 className="text-4xl font-black text-center mb-4 text-white">Create Course</h1>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-medium mb-4">
                Nombre: <br />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="nombre"
                  value={curso.nombre}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Categoría:
                <Select
                  style={{ width: "100%" }}
                  value={curso.categoria}
                  onChange={(value) => setCurso({ ...curso, categoria: value })}
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
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Descripción:
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2 resize-none"
                  name="descripcion"
                  value={curso.descripcion}
                  onChange={handleChange}
                  style={{ minHeight: "100px" }}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Imagen:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline-red-100 italic mt-2"
                  type="file"
                  accept="image/*"
                  ref={imagenRef}
                  onChange={handleImagenChange}
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Recurso:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline italic mt-2"
                  type="file"
                  ref={recursoRef}
                  onChange={handleRecursoChange}
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
              Create Course
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreateCourseForm;
