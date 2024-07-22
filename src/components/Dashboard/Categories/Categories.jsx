import React, { useState, useEffect } from "react";
import { Button, Input, Modal, message, Collapse } from "antd";
import {
  ReloadOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import LeftBar from "../../Dashboard/LeftBar";
import { useUserContext } from "../../../context/user/user.context";
import { useCoursesContext } from "../../../context/courses/courses.context";
import CreateCourseForm from "../Courses/CreateCourseForm";
import CreateCategoryForm from "./CreateCategoryForm";
import UpdateCourseForm from "../Courses/UpdateCourseForm";
import Navbar from "../NavBar";

const { Panel } = Collapse;

const DataTablete = () => {
  const { getUsers, usersData } = useUserContext();
  const {
    getAllCourses,
    courses,
    asignarContenido,
    deleteCourse,
    updateCourse,
  } = useCoursesContext();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentFile, setContentFile] = useState(null);

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
    setShowUpdateForm(true);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setSelectedCourse(null);
  };

  const handleUpdateCourse = async (updatedCourse) => {
    message.success("Successfully updated course");
    window.location.reload();
    setShowUpdateForm(false);
    setSelectedCourse(null);
  };

  const handleDeleteButtonClick = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setCourseToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCourse(courseToDelete._id);
      console.log(courseToDelete._id);
      message.success("Course successfully deleted");
      getAllCourses();
    } catch (error) {
      message.error("Error deleting course");
    } finally {
      setIsDeleteModalVisible(false);
      setCourseToDelete(null);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generateIds = () => {
    return courses
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 overflow-hidden min-h-screen">
      <div className="flex h-full">
        <LeftBar onVisibilityChange={setIsLeftBarVisible} />
        <div
          className={`w-full transition-all duration-300 ${
            isLeftBarVisible ? "ml-56 max-w-full" : ""
          }`}
        >
          <Navbar />
          <div className="flex flex-col mt-6 px-4">
            <div>
              <h2 className="text-2xl font-black text-white text-center">
                Categories
              </h2>
              <div className="flex flex-col items-center justify-center mt-4">
                <Button
                  type="primary"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateCategoryClick}
                  className="text-center font-medium text-base mt-2 "
                >
                  <b>Create Category</b>
                </Button>
                <Input
                  placeholder="Search by Name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-44 text-center font-medium text-base mt-2"
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
                        <th className="text-xl px-6 py-3 bg-green-500 text-white border-2 cursor-pointer border-blue-800">
                          Name
                        </th>
                        <th className="text-xl px-48 py-3 bg-purple-500 text-white border-2 cursor-pointer border-blue-800">
                          Description
                        </th>
                        <th className="text-xl px-20 py-3 bg-red-500 text-white border-2 border-blue-800">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((course, index) => (
                          <tr key={course._id}>
                            <td className="border-2 border-blue-800 bg-gray-300 text-lg text-black mt-1 text-center font-black">
                              {generateIds()[index]}
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
                                  className="mb-2 bg-blue-500 h-10 text-lg mr-2 ml-2"
                                  type="primary"
                                  icon={<ReloadOutlined />}
                                  onClick={() =>
                                    handleUpdateButtonClick(course)
                                  }
                                />
                                <Button
                                  className="bg-purple-600 text-white text-lg h-10 mr-2 ml-2"
                                  icon={<InfoCircleOutlined />}
                                  onClick={() =>
                                    handleDetailsButtonClick(course)
                                  }
                                />
                                <Button
                                  className="bg-red-500 h-10 text-lg text-white ml-2"
                                  icon={<DeleteOutlined />}
                                  onClick={() =>
                                    handleDeleteButtonClick(course)
                                  }
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

          <CreateCategoryForm
            visible={showCategoryForm}
            onClose={handleCategoryFormClose}
            onCreate={handleCreateCategory}
          />

          {totalPages > 1 && (
            <div className="flex justify-center mb-8 mt-8">
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
            title="Confirm deletion"
            visible={isDeleteModalVisible}
            onCancel={handleDeleteModalClose}
            maskStyle={{ backdropFilter: "blur(10px)" }}
            footer={[
              <Button key="cancel" onClick={handleDeleteModalClose}>
                Cancel
              </Button>,
              <Button
                key="delete"
                type="primary"
                danger
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>,
            ]}
          >
            <p>Are you sure you want to delete this course?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DataTablete;
