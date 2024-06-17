import React, { useState, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import { ReloadOutlined, InfoCircleOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import LeftBar from "../../Dashboard/LeftBar";
import { useUserContext } from "../../../context/user/user.context";
import { useCoursesContext } from "../../../context/courses/courses.context";
import CreateCourseForm from "../Courses/CreateCourseForm";
import CreateCategoryForm from "../Courses/CreateCategoryForm";
import UpdateCourseForm from "../Courses/UpdateCourseForm"; // Importa el nuevo formulario de actualización
import Navbar from "../NavBar";

const DataTablete = () => {
  const { getUsers, usersData } = useUserContext();
  const { getAllCourses, courses, deleteCourse } = useCoursesContext();
  const [searchValue, setSearchValue] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Estado para mostrar el formulario de actualización
  const [selectedCourse, setSelectedCourse] = useState(null); // Estado para el curso seleccionado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    getUsers();
    getAllCourses();
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

  const handleCreateCourseClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateFormClose = () => {
    setShowCreateForm(false);
  };

  const handleUpdateButtonClick = (course) => {
    setSelectedCourse(course);
    setShowUpdateForm(true); // Muestra el formulario de actualización
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setSelectedCourse(null);
  };

  const handleUpdateCourse = async (updatedCourse) => {
    message.success("Curso actualizado exitosamente");
    // Actualiza la información de la tabla aquí si es necesario
    Window.location.reload();
    setShowUpdateForm(false);
    setSelectedCourseId(null);
  };

  const handleCreateCourse = (curso) => {
    console.log("Nuevo curso:", curso);
    setShowCreateForm(false);
  };

  const handleAssignButtonClick = (course) => {
    setSelectedCourse(course);
    setIsAssignModalVisible(true);
  };

  const handleAssignModalClose = () => {
    setIsAssignModalVisible(false);
  };

  const handleDeleteButtonClick = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCourse(courseToDelete._id);
      console.log(courseToDelete._id);
      message.success("Curso eliminado exitosamente");
      // Actualiza la información de la tabla después de eliminar un curso
    } catch (error) {
      message.error("Error al eliminar el curso");
    } finally {
      setIsDeleteModalVisible(false);
      setCourseToDelete(null);
    }
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setCourseToDelete(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generateIds = () => {
    return courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 overflow-hidden min-h-screen">
      <div className="flex h-full">
        <LeftBar onVisibilityChange={setIsLeftBarVisible} />
        <div className={`w-full transition-all duration-300 ${isLeftBarVisible ? "ml-80 max-w-full" : ""}`}>
          <Navbar />
          <div className="flex flex-col p-10">
            <div>
              <h2 className="text-2xl font-black text-white text-center">Courses</h2>
              <div className="flex flex-wrap items-center justify-center mt-10">
                <Button 
                  type="primary"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateCourseClick}
                  className="mr-4 text-center font-medium text-base"
                >
                  <b>Create Course</b>
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateCategoryClick}
                  className="mr-4 text-center font-medium text-base"
                >
                  <b>Create Category</b>
                </Button>
                <Input
                  placeholder="Search by Name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-40 text-center font-medium text-base"
                />
              </div>
              <div className="mt-10 flex justify-center">
                <div className="overflow-auto w-full">
                  <table className="min-w-full overflow-x-auto">
                    <thead>
                      <tr>
                        <th className="text-xl px-3 py-3 bg-blue-500 text-white border-2 cursor-pointer border-blue-800">
                          ID
                        </th>
                        <th className="text-xl px-8 py-3 bg-yellow-500 text-white border-2 cursor-pointer border-blue-800">
                          Category
                        </th>
                        <th className="text-xl px-6 py-3 bg-green-500 text-white border-2 cursor-pointer border-blue-800">
                          Name
                        </th>
                        <th className="text-xl px-10 py-3 bg-purple-500 text-white border-2 cursor-pointer border-blue-800">
                          Description
                        </th>
                        <th className="text-xl px-20 py-3 bg-red-500 text-white border-2 border-blue-800">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((course, index) => (
                          <tr key={course._id}>
                            <td className="border-2 border-blue-800 bg-gray-300 text-lg text-black mt-1 text-center font-bold">
                              {generateIds()[index]}
                            </td>
                            <td className="border-2 border-blue-800 bg-gray-300 text-lg text-black mt-1 text-center">
                              {course.category}
                            </td>
                            <td className="border-2 border-blue-800 bg-gray-300 text-lg text-black mt-1 text-center">
                              {course.title}
                            </td>
                            <td className="border-2 border-blue-800 bg-gray-300 text-lg text-black mt-1 text-balance px-1">
                              {course.description}
                            </td>
                            <td className="border-2 border-blue-800 px-1 py-2 bg-gray-300">
                              <div className="flex justify-center">
                                <Button
                                  className="mb-2 bg-green-500 h-10 text-lg text-white mr-2 ml-2"
                                  onClick={() => handleAssignButtonClick(course)}
                                  icon={<CheckCircleOutlined />}
                                />
                                <Button
                                  className="mb-2 bg-blue-500 h-10 text-lg mr-2 ml-2"
                                  type="primary"
                                  icon={<ReloadOutlined />}
                                  onClick={() => handleUpdateButtonClick(course)}
                                />
                                <Button
                                  className="bg-purple-600 text-white text-lg h-10 mr-2 ml-2"
                                  icon={<InfoCircleOutlined />}
                                  onClick={() => handleDetailsButtonClick(course)}
                                />
                                <Button
                                  className="bg-red-500 h-10 text-lg text-white ml-2"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleDeleteButtonClick(course)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <CreateCourseForm
            visible={showCreateForm}
            onClose={handleCreateFormClose}
            onCreate={handleCreateCourse}
          />

          <CreateCategoryForm
            visible={showCategoryForm}
            onClose={handleCategoryFormClose}
            onCreate={handleCreateCategory}
          />

          <UpdateCourseForm
            visible={showUpdateForm}
            onClose={handleUpdateFormClose}
            onUpdate={handleUpdateCourse}
            courseId={selectedCourse ? selectedCourse._id : null}
          />

          {totalPages > 1 && (
            <div className="flex justify-center mb-10">
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

          <Modal
            title={`Curso ${selectedCourse ? selectedCourse.title : ''}`}
            visible={isAssignModalVisible}
            onCancel={handleAssignModalClose}
            footer={[
              <Button key="back" onClick={handleAssignModalClose}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleAssignModalClose}>
                Assign
              </Button>,
            ]}
          >
            {selectedCourse && (
              <>
                <p>{selectedCourse.content}</p>
              </>
            )}
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Recurso:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline italic mt-2"
                  type="file"
                />
              </label>
            </div>
          </Modal>

          <Modal
            title="Confirmar eliminación"
            visible={isDeleteModalVisible}
            onCancel={handleDeleteModalClose}
            footer={[
              <Button key="cancel" onClick={handleDeleteModalClose}>
                Cancelar
              </Button>,
              <Button key="delete" type="primary" danger onClick={handleDeleteConfirm}>
                Eliminar
              </Button>,
            ]}
          >
            <p>¿Estás seguro de que deseas eliminar este curso?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DataTablete;
