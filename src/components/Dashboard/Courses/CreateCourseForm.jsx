import React, { useState, useRef } from "react";
import { Modal, Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCoursesContext } from "../../../context/courses/courses.context";
import { useCategoryContext } from "../../../context/courses/category.context";

const { Option } = Select;

const CreateCourseForm = ({ visible, onClose, onCreate }) => {
  const { categories } = useCategoryContext();
  const { createCourse } = useCoursesContext();
  const MAX_DESCRIPTION_LENGTH = 150;

  const [course, setCourse] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const imageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCourse({ ...course, image: file });
      setErrorMessage("");
    } else {
      e.target.value = null;
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.name || !course.category || !course.description || !course.image) {
      setErrorMessage("All fields are required.");
      return;
    }

    const courseData = {
      title: course.name,
      category: course.category,
      description: course.description,
      image: course.image,
    };
    try {
      await createCourse(courseData);
      toast.success("Course created successfully!", { autoClose: 1000 });
      setTimeout(() => {
        onCreate(courseData);
        resetForm();
        onClose();
        window.location.reload();
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course. Please try again.", { autoClose: 3000 });
    }
  };

  const resetForm = () => {
    setCourse({
      name: "",
      category: "",
      description: "",
      image: null,
    });
    setErrorMessage("");
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={visible}
        footer={null}
        closable={false}
        className="lg:absolute top-14 left-1/3"
        maskStyle={{ backdropFilter: "blur(10px)" }}
        onCancel={onClose}
      >
        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg rounded-lg p-6 relative">
          <button
            className="absolute top-2 right-2 text-white hover:text-red-600 bg-red-400 focus:outline-none"
            onClick={onClose}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white text-center mb-6">Create Course</h1>
            <div className="mb-4">
              <label className="block text-black text-base font-bold mb-2">
                Name:
                <input
                  className="shadow font-normal appearance-none border rounded w-full py-1 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1"
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-black text-base font-bold mb-2">
                Category:
                <Select
                  className="w-full mt-1"
                  style={{ borderRadius: "0.375rem" }}
                  value={course.category}
                  onChange={(value) => setCourse({ ...course, category: value })}
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
              <label className="block text-black text-base font-bold mb-2">
                Description:
                <textarea
                  className="shadow appearance-none font-normal border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1 resize-none"
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  style={{ minHeight: "100px" }}
                  required
                />
                <div className="text-gray-300 text-right mt-1">{course.description.length}/{MAX_DESCRIPTION_LENGTH}</div>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-black text-lg font-bold mb-2">
                Image:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring focus:border-green-300 mt-1"
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImageChange}
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
