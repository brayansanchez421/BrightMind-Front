import React, { useState, useEffect } from "react";
import LeftBar from "./LeftBar"; // Import Sidebar component
import { Button, Modal, Form, Input, Select, Checkbox, Pagination  } from "antd"; // Import Ant Design components
import {
  ReloadOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { useRoleContext } from "../../context/user/role.context";
import { usePermissionContext } from "../../context/user/permissions.context";
import logo from "../../assets/img/hola.png";

const { Option } = Select;

const DataTable = () => {
  const { rolesData, updateRole } = useRoleContext();
  const { permissionsData } = usePermissionContext();

  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [form] = Form.useForm();

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

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter((id) => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
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
            ...selectedPermissions
          ]),
        ];
        
  
        const updatedRole = await updateRole(selectedRoleId, {
          nombre: selectedRole?.nombre,
          permisos: updatedPermissions,
        });
  
        setSelectedPermissions(updatedPermissions);
        setShowAssignModal(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  

  const handleAssignPermissions = (role) => {
    setShowAssignModal(true);
    setSelectedRoleId(role._id);
  };

  const handleModalClose = () => {
    setShowDetailsModal(false);
    setShowAssignModal(false);
    setSelectedRoleId(null);
    setSelectedPermissions([]);
  };

  return (
    <div className="flex h-screen">
      <LeftBar />
      <div className="ml-10 flex flex-col w-full">
        <div>
          <h2 className="text-2xl font-bold mb-4">Roles</h2>
          <div className="flex items-center mb-4">
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
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancelar
            </Button>,
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
        >
          {permissionsData &&
            permissionsData.info &&
            permissionsData.info.map((permission) => (
              <div key={permission._id}>
                 <Checkbox
  checked={
    selectedPermissions.includes(permission._id) ||
    (selectedRole && selectedRole.permisos.includes(permission.nombre))
  }
  onChange={() => handleCheckboxChange(permission._id)}
  disabled={selectedRole && selectedRole.permisos.includes(permission.nombre)}
>
  {permission.nombre}
</Checkbox>
              </div>
            ))}
        </Modal>
      </div>
    </div>
  );
};

export default DataTable;
