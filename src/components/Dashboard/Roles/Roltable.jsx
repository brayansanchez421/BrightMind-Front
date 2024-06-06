import React, { useState, useEffect } from "react";
import LeftBar from "../../Dashboard/LeftBar";
import { Button, Modal, Checkbox, Pagination, Input, Form } from "antd";
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRoleContext } from "../../../context/user/role.context";
import { usePermissionContext } from "../../../context/user/permissions.context";
import CreateRolForm from "../Roles/CreateRolForm";
import Navbar from "../../Dashboard/NavBar";

const { useForm } = Form;

const DataTable = () => {
  const [permissionsUpdated, setPermissionsUpdated] = useState(false);

  const { rolesData, updateRole, deleteRole } = useRoleContext();
  const { permissionsData } = usePermissionContext();

  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form] = useForm();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const [selectedRole, setSelectedRole] = useState(null);
  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        setItemsPerPage(5);
      } else if (width < 2000) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(5);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the correct itemsPerPage

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
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
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

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewPermissions = (role) => {
    setShowDetailsModal(true);
    setSelectedRoleId(role._id);
  };

  const handleDeleteRole = (roleId) => {
    setSelectedRoleId(roleId);
    setShowDeleteModal(true);
  };

  const confirmDeleteRole = async () => {
    try {
      console.log(selectedRoleId)
      await deleteRole(selectedRoleId);
      setShowDeleteModal(false);
      setUpdatedDataFlag(true); // Trigger data refresh
      window.location.reload();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const [selectedPermissionsMap, setSelectedPermissionsMap] = useState({});

  const handleCheckboxChange = (roleId, permissionId) => {
    setSelectedPermissionsMap((prevMap) => {
      const selectedPermissions = prevMap[roleId] || [];
      const updatedPermissions = selectedPermissions.includes(permissionId)
        ? selectedPermissions.filter((id) => id !== permissionId)
        : [...selectedPermissions, permissionId];

      localStorage.setItem(roleId, JSON.stringify(updatedPermissions));

      return {
        ...prevMap,
        [roleId]: updatedPermissions,
      };
    });
  };

  useEffect(() => {
    const storedPermissionsMap = {};
    rolesData.forEach((role) => {
      const storedPermissions = JSON.parse(localStorage.getItem(role._id));
      if (storedPermissions) {
        storedPermissionsMap[role._id] = storedPermissions;
      }
    });
    setSelectedPermissionsMap(storedPermissionsMap);
  }, [rolesData]);

  const handleAssignPermissions = (role) => {
    setSelectedRoleId(role._id);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setShowDetailsModal(false);
    setShowAssignModal(false);
    setSelectedRoleId(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCreateRol = (role) => {
    console.log("Nuevo rol:", role);
    setShowForm(false);
  };

  const handleAssignPermissionsSubmit = async () => {
    try {
      if (selectedRole) {
        const permissionIdMap = {};
        permissionsData.info.forEach((permission) => {
          permissionIdMap[permission.nombre] = permission._id;
          setPermissionsUpdated(true);
        });

        const updatedPermissions = [
          ...new Set([
            ...(selectedRole.permissions || []).map(
              (nombre) => permissionIdMap[nombre]
            ),
            ...(selectedPermissionsMap[selectedRoleId] || []),
          ]),
        ];

        await updateRole(selectedRoleId, {
          nombre: selectedRole?.nombre,
          permisos: updatedPermissions,
        });

        setShowAssignModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      <div className="flex h-screen overflow-hidden">
      <LeftBar onVisibilityChange={setIsLeftBarVisible} />
      <div
          className={`w-full transition-all duration-300 ${
            isLeftBarVisible ? "ml-80 max-w-full" : ""
          }`}
        >

        <Navbar />
        <div className="flex flex-col mt-10">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white text-center">Roles</h2>
            <div className="flex items-center mb-4 mt-10 justify-center">
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
            <div className="overflow-x-auto mt-10 flex justify-center">
              <table className="md:w-10/12 bg-gray-300">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-4 bg-blue-500 text-white border-2 border-blue-800 cursor-pointer"
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
                      className="px-6 py-4 bg-yellow-500 text-white border-2 border-blue-800 cursor-pointer"
                      onClick={() => orderBy("nombre")}
                    >
                      Name{" "}
                      {sortConfig.key === "nombre" &&
                        (sortConfig.direction === "ascending" ? (
                          <CaretUpOutlined />
                        ) : (
                          <CaretDownOutlined />
                        ))}
                    </th>
                    <th className="w-72 py-4 bg-green-500 text-white border-2 border-blue-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rolesData &&
                    currentItems.map((role, index) => (
                      <tr key={role._id}>
                        <td className="border-2 border-blue-800 px-6 text-black text-center py-4 text-lg">
                          {generateIds()[index]}
                        </td>
                        <td className="border-2 border-blue-800 px-6 text-black text-center py-4 text-lg">
                          {role.nombre}
                        </td>
                        <td className="border-2 border-blue-800 px-6 text-black text-center py-4 text-lg">
                          <Button
                            className="bg-blue-900 h-10"
                            type="primary"
                            onClick={() => handleViewPermissions(role)}
                          >
                            View
                          </Button>{" "}
                          <Button
                            className="bg-cyan-800 h-10"
                            type="primary"
                            onClick={() => handleAssignPermissions(role)}
                          >
                            Assign
                          </Button>{" "}
                          <Button
                            className="bg-red-600 h-10"
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteRole(role._id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-end mr-40 mt-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
      </div>  
        <Modal
          className="shadow-md shadow-pink-400"
          title={
            selectedRole ? `Permissions for ${selectedRole.nombre}` : "Role Details"
          }
          visible={showDetailsModal}
          onCancel={handleModalClose}
          footer={null}
          centered
          maskStyle={{ backdropFilter: "blur(10px)" }}
        >
          {selectedRole && (
            <div className="bg-slate-700 p-4 py-4 rounded-md shadow-sky-500 shadow-lg text-white">
              <p>
                <b>Role ID:</b> {selectedRole._id}
              </p>
              <p>
                <b>Name:</b> {selectedRole.nombre}
              </p>
              <p>
                <b>Permissions:</b>
              </p>
              <ul>
                {selectedRole &&
                  selectedRole.permisos &&
                  selectedRole.permisos.map((permiso) => (
                    <li key={permiso}>{permiso}</li>
                  ))}
              </ul>
            </div>
          )}
        </Modal>
        <Modal
          className="shadow-2xl shadow-pink-400"
          title="Assign Permissions"
          visible={showAssignModal}
          onCancel={handleModalClose}
          footer={[
            <Button
              className="bg-sky-700 font-medium"
              key="submit"
              type="primary"
              onClick={handleAssignPermissionsSubmit}
            >
              Assign Permissions
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
                  checked={selectedPermissionsMap[selectedRoleId]?.includes(permission._id)}
                  onChange={() => handleCheckboxChange(selectedRoleId, permission._id)}
                  style={{
                    color: selectedPermissionsMap[selectedRoleId]?.includes(permission._id)
                      ? "green"
                      : "red",
                  }}
                >
                  {permission.nombre}
                </Checkbox>
              </div>
            ))}
        </Modal>
        <CreateRolForm visible={showForm} onClose={handleFormClose} onCreate={handleCreateRol} />
        <Modal
          className="shadow-2xl shadow-pink-400"
          title="Confirm Delete"
          visible={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          footer={[
            <Button
              className="bg-red-700 font-medium text-white hover:bg-red-900"
              key="submit"
              type="primary"
              onClick={confirmDeleteRole}
            >
              Delete
            </Button>,
            <Button
              className="bg-gray-300 font-medium text-black hover:bg-gray-400"
              key="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>,
          ]}
          centered
          maskStyle={{ backdropFilter: "blur(10px)" }}
          maskClosable={false}
          keyboard={false}
        >
          <p className="text-lg text-black">Are you sure you want to delete this role?</p>
          <p className="text-md text-red-600"><b>This action cannot be undone.</b></p>
        </Modal>
      </div>
  );
};

export default DataTable;