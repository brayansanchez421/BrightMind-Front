import { useState, useEffect } from "react";
import LeftBar from "./LeftBar"; // Import Sidebar component
import { Button, Modal, Form, Input, Select, Checkbox } from "antd"; // Import Ant Design components
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
  console.log("rolesData", rolesData);
  console.log("permissionData", permissionsData);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData()
    .filter((item) => filteredRoles.includes(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generateIds = () => {
    return currentItems.map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };

  const handleViewPermissions = (role) => {
    setShowDetailsModal(true);
    setSelectedRoleId(role._id);
  };

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Función para manejar el cambio en el checkbox
  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        // Si el permiso ya está seleccionado, se elimina
        return prevPermissions.filter((id) => id !== permissionId);
      } else {
        // Si el permiso no está seleccionado, se agrega
        return [...prevPermissions, permissionId];
      }
    });
  };

  const handleAssignPermissionsSubmit = async () => {
    try {
      const permissionIdMap = {};
      permissionsData.info.forEach(permission => {
        permissionIdMap[permission.nombre] = permission._id;
      });

      const updatedPermissions = [
        ...new Set([
          ...selectedRole.permisos.map(nombre => permissionIdMap[nombre]),
          ...selectedPermissions
        ]),
      ];

      console.log("Datos a enviar:", {
        nombre: selectedRole?.nombre,
        permissions: updatedPermissions,
      });

      const updatedRole = await updateRole(selectedRoleId, {
        nombre: selectedRole?.nombre,
        permisos: updatedPermissions,
      });

      console.log("Role updated:", updatedRole);
      setSelectedPermissions(updatedPermissions); // Actualizar el estado con todos los permisos
      setShowAssignModal(false);
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
                {currentItems.map((role, index) => (
                  <tr key={role._id}>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {generateIds()[index]}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {role.nombre}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <Button
                        type="success"
                        onClick={() => handleViewPermissions(role)}
                        className="mr-2"
                      >
                        Ver Permisos
                      </Button>
                      <Button
                        type="success"
                        onClick={() => handleAssignPermissions(role)}
                      >
                        Asignar Permisos
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="default"
              icon={<ReloadOutlined />}
              onClick={() => setUpdatedDataFlag(true)}
            >
              Recargar
            </Button>
          </div>
        </div>
        <Modal
          title="Detalles del Rol"
          visible={showDetailsModal}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Cerrar
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              nombre: selectedRole?.nombre,
              permisos: selectedRole?.permisos,
            }}
          >
            <Form.Item label="Nombre" name="nombre">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Permisos" name="permisos">
              <Select mode="multiple" disabled>
                {permissionsData.info.map((permission) => (
                  <Option key={permission._id} value={permission._id}>
                    {permission.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Asignar Permisos"
          visible={showAssignModal}
          onOk={handleAssignPermissionsSubmit}
          onCancel={handleModalClose}
          okButtonProps={{ type: "success" }} // Cambiar el tipo de botón a success
        >
          <Form layout="vertical">
            <Form.Item label="Permisos" name="permisos">
              {permissionsData.info.map((permission) => (
                <Checkbox
                  key={permission._id}
                  value={permission._id}
                  onChange={() => handleCheckboxChange(permission._id)}
                  checked={selectedPermissions.includes(permission._id)}
                >
                  {permission.nombre}
                </Checkbox>
              ))}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DataTable;
