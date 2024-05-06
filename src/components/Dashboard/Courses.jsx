import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Modal } from "antd";
import { ReloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import LeftBar from "./LeftBar"; // Importa el componente Sidebar
import { useUserContext } from "../../context/user/user.context";

const DataTablete = () => {
  const { getUsers, usersData } = useUserContext();
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [curso, setCurso] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen: "",
    recurso: null,
  });

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

  const imagenRef = useRef(null);
  const recursoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurso({ ...curso, imagen: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRecursoChange = (e) => {
    const file = e.target.files[0];
    setCurso({ ...curso, recurso: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario a tu backend o hacer lo que necesites con los datos del curso
    console.log(curso);
  };

  // Función para cambiar de página
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

      <Modal 
        visible={showForm}
        footer={null}
        className=""
        closable={false}
      >
        <form onSubmit={handleSubmit} className="w-full h-full shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-8 relative shadow-orange rounded ">
          <button // Botón para cerrar el formulario
            className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400"
            onClick={handleFormClose}
          >
            X
          </button>
          <div>
            <h1 className="text-4xl font-black text-center mb-4 text-white">Create Course</h1>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-medium mb-4">
                Nombre: <br/>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="nombre"
                  value={curso.nombre}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-4 ">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Categoria:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="categoria"
                  value={curso.categoria}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-zinc-100 text-lg font-bold mb-4">
                Descripcion:
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
                {curso.imagen && (
                  <div className="flex justify-center items-center">
                    <img 
                      src={curso.imagen}
                      alt="Preview"
                      className="mt-6 rounded-2xl h-36"
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                    <button
                      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setCurso({ ...curso, imagen: "" })}
                    >
                      Discard
                    </button>
                  </div>
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
              onClick={handleFormClose}
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

    </div>
  );
};

export default DataTablete;
