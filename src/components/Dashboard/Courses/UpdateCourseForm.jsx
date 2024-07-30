import React, { useState, useEffect, useRef } from "react";
import { Modal, Select } from "antd";
import { useCoursesContext } from "../../../context/courses/courses.context";
import { useCategoryContext } from "../../../context/courses/category.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const UpdateCourseForm = ({ visible, onClose, onUpdate, courseId }) => {
  const { t } = useTranslation("global");
  const { categories } = useCategoryContext();
  const { updateCourse, getCourse } = useCoursesContext();
  const MAX_DESCRIPCION_LENGTH = 150;

  const [curso, setCurso] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const imagenRef = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (courseId) {
        const courseData = await getCourse(courseId);
        setCurso({
          nombre: courseData.title,
          categoria: courseData.category,
          descripcion: courseData.description,
          imagen: null,
        });
      }
    };
    if (visible) {
      fetchCourseData();
    }
  }, [courseId, getCourse, visible]);

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
      setErrorMessage(t("updateCourseForm.invalidImageFile"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title: curso.nombre,
      category: curso.categoria,
      description: curso.descripcion,
      image: curso.imagen,
    };
    try {
      await updateCourse(courseId, courseData);
      onUpdate(courseData);
      toast.success(t("updateCourseForm.updateSuccess"), { autoClose: 1000 });
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(t("updateCourseForm.updateFailure"));
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        className="shadow-orange shadow-white border-2 border-black rounded-lg"
        centered
        maskStyle={{ backdropFilter: "blur(15px)" }}
      >
        <form onSubmit={handleSubmit} className="bg-gradient-to-tr from-teal-400 to-blue-500 p-4 ">
          <div>
            <h1 className="text-4xl font-black text-center mb-4 text-white">
              {t("updateCourseForm.title")}
            </h1>
            <div className="mb-4">
              <label className="block text-black text-lg font-medium mb-4">
                {t("updateCourseForm.name")}:
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-2 font-normal text-base"
                  type="text"
                  name="nombre"
                  value={curso.nombre}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="block text-black text-lg font-medium mb-4">
                {t("updateCourseForm.category")}:
                <Select
                  className="font-normal text-black text-base mt-2 "
                  style={{ width: "100%" }}
                  value={curso.categoria}
                  onChange={(value) => setCurso({ ...curso, categoria: value })}
                >
                  {categories.map(category => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </label>
            </div>
            <div>
              <label className="block text-black text-lg font-medium mb-2">
                {t("updateCourseForm.description")}:
                <textarea
                  className="shadow appearance-none border text-base rounded w-full py-2 px-3 text-black leading-tight font-normal focus:outline-none focus:shadow-outline mt-2 resize-none"
                  name="descripcion"
                  value={curso.descripcion}
                  onChange={handleChange}
                  maxLength={MAX_DESCRIPCION_LENGTH}
                  style={{ minHeight: "100px" }}
                />
                <div className="text-white mt-1 text-right">
                  {curso.descripcion.length}/{MAX_DESCRIPCION_LENGTH}
                </div>
              </label>
            </div>
            <div>
              <label className="block text-black text-lg font-bold mb-2">
                {t("updateCourseForm.image")}:
                <input
                  className="shadow text-normal appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline-red-100 italic mt-2"
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
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              {t("updateCourseForm.updateButton")}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              type="button"
              onClick={onClose}
            >
              {t("updateCourseForm.closeButton")}
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UpdateCourseForm;
