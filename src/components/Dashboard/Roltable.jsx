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
  const [showForm, setShowForm] = useState(false);

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

  const [selectedPermissionsMap, setSelectedPermissionsMap] = useState({});

  const handleCheckboxChange = (roleId, permissionId) => {
    setSelectedPermissionsMap((prevMap) => {
      const selectedPermissions = prevMap[roleId] || [];
      const updatedPermissions = selectedPermissions.includes(permissionId)
        ? selectedPermissions.filter((id) => id !== permissionId)
        : [...selectedPermissions, permissionId];

      // Guardar los permisos seleccionados en el almacenamiento local
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

  const handleCreateRol = (curso) => {
    // Aquí puedes manejar la lógica para crear un nuevo curso
    console.log("Nuevo curso:", curso);
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
            ...selectedPermissionsMap[selectedRoleId] || []
          ]),
        ];
        
  
        const updatedRole = await updateRole(selectedRoleId, {
          nombre: selectedRole?.nombre,
          permisos: updatedPermissions,
        });
  
        // No es necesario actualizar los permisos seleccionados aquí
        setShowAssignModal(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600">
      <LeftBar />
      <div className="ml-10 flex flex-col w-full mr-10">
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
          <div className="">
            <table className="w-full bg-gray-400">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 bg-yellow-400 text-white border border-black cursor-pointer"
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
                    className="px-6 py-3 bg-fuchsia-600 text-white border border-black cursor-pointer"
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
                  <th className="px-6 py-3 bg-pink-500 text-white border border-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rolesData &&
                  currentItems.map((role, index) => (
                    <tr key={role._id}>
                      <td className="border border-gray-700 px-6 text-white text-center font-bold py-2 ">{generateIds()[index]}</td>
                      <td className="border border-gray-700 px-6 text-white text-center font-bold py-2 ">{role.nombre}</td>
                      <td className="border border-gray-700 px-6 text-white text-center py-2 ">
                        <Button 
                          type="primary"
                          onClick={() => handleViewPermissions(role)}
                        >
                          View
                        </Button>{" "}
                        <Button
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
            <div className="flex justify-end mt-10">
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
        <Modal className="shadow-md shadow-pink-400"
          title={
            selectedRole
              ? `Permissions for ${selectedRole.nombre}`
              : "Role Details"
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
                <b>Permisions:</b>
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
        <Modal className="shadow-2xl shadow-pink-400 "
              title="Assign Permissions"
              visible={showAssignModal}
              onCancel={handleModalClose}
              footer={[
                <Button className="bg-sky-700 font-medium"
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
                      style={{ color: selectedPermissionsMap[selectedRoleId]?.includes(permission._id) ? 'green' : 'red' }}
                    >
                      {permission.nombre}
                    </Checkbox>
                  </div>
                ))}
        </Modal>
          <CreateRolForm
            visible={showForm}
            onClose={handleFormClose}
            onCreate={handleCreateRol}
          />
      </div>
    </div>
  );
};

export default DataTable;
