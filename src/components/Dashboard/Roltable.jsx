import React, { useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import { Button, Modal, Checkbox, Pagination, Input, Form } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useRoleContext } from "../../context/user/role.context";
import { usePermissionContext } from "../../context/user/permissions.context";
import CreateRolForm from './CreateRolForm';

const { useForm } = Form;

const DataTable = () => {
  const { rolesData, updateRole } = useRoleContext();
  const { permissionsData } = usePermissionContext();

  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario de creación de roles

  const [form] = useForm();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const [selectedRole, setSelectedRole] = useState(null);
  useEffect(() => {
    if (selectedRoleId) {
      setSelectedRole(rolesData.find((role) => role._id === selectedRoleId));
    }
  }, [selectedRoleId, rolesData]);
  useEffect(() => {
    form.setFieldsValue({
      name: selectedRole?.name,
      permissions: selectedRole?.permissions,
    });
  }, [selectedRole, form]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const filteredRoles = rolesData.filter((role) =>
    Object.values(role).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1600) {
        setItemsPerPage(6);
      } else if (width < 2000) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(10);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updatedDataFlag]);

  useEffect(() => {
    if (updatedDataFlag) {
      setUpdatedDataFlag(false);
    }
  }, [rolesData, updatedDataFlag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const orderBy = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let sortableData = [...rolesData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const generateIds = () => {
    return rolesData.map((_, index) => index + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData()
    .filter((item) => filteredRoles.includes(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewPermissions = (role) => {
    setShowDetailsModal(true);
    setSelectedRoleId(role._id);
  };

  // Estado para almacenar los permisos seleccionados de cada rol
  const [selectedPermissionsMap, setSelectedPermissionsMap] = useState({});

  const handleCheckboxChange = (roleId, permissionId) => {
    setSelectedPermissionsMap((prevMap) => {
      const selectedPermissions = prevMap[roleId] || [];
      const updatedPermissions = selectedPermissions.includes(permissionId)
        ? selectedPermissions.filter((id) => id !== permissionId)
        : [...selectedPermissions, permissionId];

      return {
        ...prevMap,
        [roleId]: updatedPermissions,
      };
    });
  };

  const handleAssignPermissions = (role) => {
    setSelectedRoleId(role._id);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setShowDetailsModal(false);
    setShowAssignModal(false);
    setSelectedRoleId(null);
    // No necesitamos restaurar los permisos seleccionados aquí
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCreateRol = (curso) => {
    // Aquí puedes manejar la lógica para crear un nuevo curso
    console.log("Nuevo curso:", curso);
    // Aquí podrías enviar los datos del curso al servidor, etc.
    // Luego de realizar las acciones necesarias, cierra el formulario
    setShowForm(false);
  };

  const handleAssignPermissionsSubmit = async () => {
    try {
      if (selectedRole) {
        const permissionIdMap = {};
        permissionsData.info.forEach(permission => {
          permissionIdMap[permission.nombre] = permission._id;
        });
  
        const updatedPermissions = [
          ...new Set([
            ...(selectedRole.permissions || []).map(nombre => permissionIdMap[nombre]),
            ...(selectedPermissionsMap[selectedRoleId] || [])
          ]),
        ];
        
  
        const updatedRole = await updateRole(selectedRoleId, {
          nombre: selectedRole?.nombre,
          permisos: updatedPermissions,
        });
  
        // No necesitamos actualizar los permisos seleccionados aquí
        setShowAssignModal(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <LeftBar />
      <div className="ml-10 flex flex-col w-full">
        <div>
          <h2 className="text-2xl font-bold mb-4">Roles</h2>
          <div className="flex items-center mb-4">
          <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => setShowForm(true)}
              className="mr-4"
            >
              <b>Create Rol</b>
            </Button>
            <Input
              placeholder="Search by roles"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 bg-blue-500 text-white border-b border-gray-300 cursor-pointer"
                    onClick={() => orderBy("id")}
                  >
                    ID{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th
                    className="px-6 py-3 bg-blue-500 text-white border-b border-gray-300 cursor-pointer"
                    onClick={() => orderBy("nombre")}
                  >
                    Nombre{" "}
                    {sortConfig.key === "nombre" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th className="px-6 py-3 bg-blue-500 text-white border-b border-gray-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {rolesData &&
                  currentItems.map((role, index) => (
                    <tr key={role._id}>
                      <td className="border px-6 py-4">{generateIds()[index]}</td>
                      <td className="border px-6 py-4">{role.nombre}</td>
                      <td className="border px-6 py-4">
                        <Button
                          type="primary"
                          onClick={() => handleViewPermissions(role)}
                        >
                          Ver
                        </Button>{" "}
                        <Button
                          type="primary"
                          onClick={() => handleAssignPermissions(role)}
                        >
                          Asignar
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <Pagination
                current={currentPage}
                total={filteredRoles.length}
                pageSize={itemsPerPage}
                onChange={paginate}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
        <Modal
          title={
            selectedRole
              ? `Permisos para ${selectedRole.nombre}`
              : "Detalles del Rol"
          }
          visible={showDetailsModal}
          onCancel={handleModalClose}
          footer={null}
          centered
          maskStyle={{ backdropFilter: "blur(10px)" }}
        >
          {selectedRole && (
            <div className="bg-white p-4 rounded-md shadow-orange">
              <p>
                <b>ID del Rol:</b> {selectedRole._id}
              </p>
              <p>
                <b>Nombre:</b> {selectedRole.nombre}
              </p>
              <p>
                <b>Permisos:</b>
              </p>
              <ul>
                {selectedRole &&
                  selectedRole.permisos &&
                  selectedRole.permisos.map((permiso) => (
                    <li key={permiso._id}>{permiso.nombre}</li>
                  ))}
              </ul>
            </div>
          )}
        </Modal>
        <Modal
              title="Asignar Permisos"
              visible={showAssignModal}
              closable={false}
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleAssignPermissionsSubmit}
                >
                  Asignar Permisos
                </Button>,
              ]}
              centered
              maskStyle={{ backdropFilter: "blur(10px)" }}
              maskClosable={false}
              keyboard={false}
            >
              {permissionsData &&
                permissionsData.info &&
                permissionsData.info.map((permission) => (
                  <div key={permission._id}>
                    <Checkbox
                      checked={
                        selectedPermissionsMap[selectedRoleId] &&
                        selectedPermissionsMap[selectedRoleId].includes(permission._id)
                      }
                      onChange={() => handleCheckboxChange(selectedRoleId, permission._id)}
                      style={{ color: selectedPermissionsMap[selectedRoleId]?.includes(permission._id) ? 'green' : 'red' }}
                    >
                      {permission.nombre}
                    </Checkbox>
                  </div>
                ))}
        </Modal>
          {/* Paginación */}
          <CreateRolForm
            visible={showForm}
            onClose={handleFormClose}
            onCreate={handleCreateRol}
          />
          <div className="mt-2 ml-2">
            {Array.from(
              { length: Math.ceil(filteredRoles.length / itemsPerPage) },
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
  );
};

export default DataTable;
