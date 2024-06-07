import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { ReloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import LeftBar from "../../Dashboard/LeftBar";
import { useUserContext } from "../../../context/user/user.context";
import { useCoursesContext } from "../../../context/courses/courses.context"; // Importa el contexto de cursos
import CreateCourseForm from "../Courses/CreateCourseForm";
import CreateCategoryForm from "../Courses/CreateCategoryForm";
import Navbar from "../NavBar";

const DataTablete = () => {
  const { getUsers, usersData } = useUserContext();
  const { getAllCourses, courses } = useCoursesContext(); // Usa el contexto de cursos
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

  useEffect(() => {
    getUsers();
    getAllCourses(); // Llama a la función para obtener todos los cursos
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(courses.length / itemsPerPage));
  }, [courses, itemsPerPage]);

  const handleCreateCategory = (category) => {
    console.log("Nueva categoría:", category);
    setShowCategoryForm(false);
  };

  const handleCreateCategoryClick = () => {
    setShowCategoryForm(true);
  };

  const handleCategoryFormClose = () => {
    setShowCategoryForm(false);
  };

  const handleUpdateButtonClick = (item) => {
    setSelectedUser(item);
    setShowForm(true);
  };

  const handleCreateCourseClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCreateCourse = (curso) => {
    console.log("Nuevo curso:", curso);
    setShowForm(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generateIds = () => {
    return courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      <div className="flex h-screen overflow-hidden">
        <LeftBar onVisibilityChange={setIsLeftBarVisible} />
        <div className={`w-full transition-all duration-300 ${isLeftBarVisible ? "ml-80 max-w-full" : ""}`}>
          <Navbar />
          <div className="flex flex-col mt-20 p-4">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white text-center">Courses</h2>
              <div className="flex items-center mb-4 justify-center mt-10">
                <Button
                  type="primary"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateCourseClick}
                  className="mr-4"
                >
                  <b>Create Course</b>
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateCategoryClick}
                >
                  <b>Create Category</b>
                </Button>

                <Input
                  placeholder="Search by Name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-40 left-2"
                />
              </div>

              <div className="overflow-x-auto mt-10 flex justify-center">
                <table className="w-10/12">
                  <thead>
                    <tr>
                      <th className="text-xl px-6 py-3 bg-blue-500 text-white border-2 cursor-pointer border-blue-800">
                        ID
                      </th>
                      <th className="text-xl px-6 py-3 bg-yellow-500 text-white border-2 cursor-pointer border-blue-800">
                        Category
                      </th>
                      <th className="text-xl px-6 py-3 bg-green-500 text-white border-2 cursor-pointer border-blue-800">
                        Name
                      </th>
                      <th className="text-xl px-6 py-3 bg-purple-500 text-white border-2 cursor-pointer border-blue-800">
                        Description
                      </th>
                      <th className="text-xl px-6 py-3 bg-red-500 text-white border-2 border-blue-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((course, index) => (
                        <tr key={course._id}>
                          <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                            {generateIds()[index]}
                          </td>
                          <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                            {course.category}
                          </td>
                          <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                            {course.title}
                          </td>
                          <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                            {course.description}
                          </td>
                          <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-balance">
                            <div className="flex justify-center items-center text-center">
                              <Button
                                className="mr-2 bg-blue-500 h-10 text-lg"
                                type="primary"
                                icon={<ReloadOutlined />}
                                onClick={() => handleUpdateButtonClick(course)}
                              >
                                Update Courses
                              </Button>
                              <Button
                                className="bg-purple-600 text-white text-lg h-10"
                                icon={<InfoCircleOutlined />}
                                onClick={() => handleDetailsButtonClick(course)}
                              >
                                Details Courses
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <CreateCourseForm
            visible={showForm}
            onClose={handleFormClose}
            onCreate={handleCreateCourse}
          />

          <CreateCategoryForm
            visible={showCategoryForm}
            onClose={handleCategoryFormClose}
            onCreate={handleCreateCategory}
          />

          {totalPages > 1 && (
            <div className="flex justify-end mr-32 mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 border"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 mx-1 ${
                    currentPage === index + 1
                      ? "bg-black border text-white"
                      : "bg-gray-200 text-gray-800 border"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 border"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTablete;
