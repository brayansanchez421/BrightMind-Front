import React, { useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import { Button, Modal, Checkbox, Pagination, Input, Form } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useRoleContext } from "../../context/user/role.context";
import { usePermissionContext } from "../../context/user/permissions.context";
import CreateRolForm from './CreateRolForm';

const { useForm } = Form;

const DataTable = () => {
  const [permissionsUpdated, setPermissionsUpdated] = useState(false);
  const { rolesData, updateRole } = useRoleContext();
  const { permissionsData } = usePermissionContext();

  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form] = useForm();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedPermissionsMap, setSelectedPermissionsMap] = useState({});

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

  const filteredRoles = rolesData.filter((role) =>
    Object.values(role).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

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
    return () => window.removeEventListener("resize", handleResize);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewPermissions = (role) => {
    setShowDetailsModal(true);
    setSelectedRoleId(role._id);
  };

  const handleCheckboxChange = (roleId, permissionId) => {
    setSelectedPermissionsMap((prevMap) => {
      const selectedPermissions = prevMap[roleId] || [];
      const updatedPermissions = selectedPermissions.includes(permissionId)
        ? selectedPermissions.filter((id) => id !== permissionId)
        : [...selectedPermissions, permissionId];

      localStorage.setItem(roleId, JSON.stringify(updatedPermissions));
      return { ...prevMap, [roleId]: updatedPermissions };
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
    console.log("Nuevo curso:", role);
    setShowForm(false);
  };

  const handleAssignPermissionsSubmit = async () => {
    try {
      if (selectedRole) {
        const permissionIdMap = {};
        permissionsData.info.forEach(permission => {
          permissionIdMap[permission.nombre] = permission._id;
          setPermissionsUpdated(true);
        });

        const updatedPermissions = [
          ...new Set([
            ...(selectedRole.permissions || []).map(nombre => permissionIdMap[nombre]),
            ...selectedPermissionsMap[selectedRoleId] || []
          ]),
        ];

        await updateRole(selectedRoleId, {
          nombre: selectedRole?.nombre,
          permisos: updatedPermissions,
        });

        setShowAssignModal(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      <LeftBar className="flex h-screen overflow-hidden" />
      <div className="ml-10 flex flex-col w-3/4 mr-10">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">Roles</h2>
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
          <div className="overflow-x-auto w-full">
            <table className="w-full bg-gray-300">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 bg-yellow-400 text-white border border-blue-800 cursor-pointer"
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
                    className="px-6 py-3 bg-fuchsia-600 text-white border border-blue-800 cursor-pointer"
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
                  <th className="px-6 py-4 bg-pink-500 text-white border border-blue-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rolesData &&
                  currentItems.map((role, index) => (
                    <tr key={role._id}>
                      <td className="border border-blue-800 px-6 text-black text-center font-semibold py-2 ">{generateIds()[index]}</td>
                      <td className="border border-blue-800 px-6 text-black text-center font-semibold py-2 ">{role.nombre}</td>
                      <td className="border border-blue-800 px-6 text-black text-center py-4 ">
                        <Button className="text-black font-semibold"
                          type="primary"
                          onClick={() => handleViewPermissions(role)}
                        >
                          View
                        </Button>{" "}
                        <Button className="text-black font-semibold"
                          type="primary"
                          onClick={() => handleAssignPermissions(role)}
                        >
                          Assign
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              </table>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredRoles.length}
              onChange={paginate}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Assign Permissions"
        visible={showAssignModal}
        onCancel={handleModalClose}
        onOk={handleAssignPermissionsSubmit}
      >
        <h2>Role: {selectedRole?.nombre}</h2>
        {permissionsData?.info?.map((permission) => (
          <Checkbox
            key={permission._id}
            checked={selectedPermissionsMap[selectedRoleId]?.includes(permission._id)}
            onChange={() => handleCheckboxChange(selectedRoleId, permission._id)}
          >
            {permission.nombre}
          </Checkbox>
        ))}
      </Modal>

      <Modal
        title="Role Permissions"
        visible={showDetailsModal}
        onCancel={handleModalClose}
        footer={null}
      >
        <h2>Role: {selectedRole?.nombre}</h2>
        <ul>
          {selectedRole?.permissions?.map((permissionId) => {
            const permission = permissionsData?.info?.find((perm) => perm._id === permissionId);
            return permission ? <li key={permissionId}>{permission.nombre}</li> : null;
          })}
        </ul>
      </Modal>

      <Modal
        title="Create Rol"
        visible={showForm}
        onCancel={handleFormClose}
        footer={null}
      >
        <CreateRolForm onSubmit={handleCreateRol} onClose={handleFormClose} />
      </Modal>
    </div>
  );
};

export default DataTable;

