import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Modal } from "antd";
import { ReloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import LeftBar from "./LeftBar";
import { useUserContext } from "../../context/user/user.context";
import CreateCourseForm from './CreateCourseForm';

const DataTablete = () => {
  const { getUsers, usersData } = useUserContext();
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getUsers();
  }, []);

  const handleUpdateButtonClick = (item) => {
    setSelectedUser(item);
    setShowForm(true);
  };

  const handleDetailsButtonClick = (item) => {
    setSelectedUser(item);
    setShowDetailsModal(true);
  };

  const handleCreateCourseClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCreateCourse = (curso) => {
    // Aquí puedes manejar la lógica para crear un nuevo curso
    console.log("Nuevo curso:", curso);
    // Aquí podrías enviar los datos del curso al servidor, etc.
    // Luego de realizar las acciones necesarias, cierra el formulario
    setShowForm(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 h-screen flex">
      <LeftBar />
      <div className="ml-10 flex flex-col w-full">
        <div>
          <h2 className="text-4xl font-bold mb-4 text-white">Courses</h2>
          <div className="flex items-center mb-4">
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={handleCreateCourseClick}
              className="mr-4"
            >
              <b>Create Course</b>
            </Button>
            <Input
              placeholder="Search by Name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-xl px-6 py-3 bg-blue-500 text-white border  cursor-pointer  border-blue-800">
                    ID
                  </th>
                  <th className="text-xl px-6 py-3 bg-yellow-500 text-white  border cursor-pointer  border-blue-800">
                    Category
                  </th>
                  <th className="text-xl px-6 py-3 bg-green-500 text-white  border cursor-pointer  border-blue-800">
                    Name
                  </th>
                  <th className="text-xl px-6 py-3 bg-purple-500 text-white  border cursor-pointer  border-blue-800">
                    Description
                  </th>
                  <th className="text-xl px-6 py-3 bg-red-500 text-white border  border-blue-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                        {item.id}
                      </td>
                      <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                        {item.category}
                      </td>
                      <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                        {item.name}
                      </td>
                      <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                        {item.description}
                      </td>
                      <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg">
                        <Button
                          type="primary"
                          icon={<ReloadOutlined />}
                          className="mr-2 bg-blue-900 border-0 hover:bg-blue-300 border-blue-800"
                          onClick={() => handleUpdateButtonClick(item)}
                        >
                          Update Courses
                        </Button>
                        <Button
                          icon={<InfoCircleOutlined />}
                          onClick={() => handleDetailsButtonClick(item)}
                        >
                          Details Courses
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <CreateCourseForm
            visible={showForm}
            onClose={handleFormClose}
            onCreate={handleCreateCourse}
          />
          <div className="mt-2 ml-2">
            {Array.from(
              { length: Math.ceil(usersData.length / itemsPerPage) },
              (_, index) => (
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
              )
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default DataTablete;
