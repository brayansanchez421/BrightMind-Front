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
    const { permissionsData} = usePermissionContext();
    console.log("rolesData", rolesData)
    console.log("permissionData", permissionsData)


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

  const generateIds = () => {
    return currentItems.map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
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

    const handleViewPermissions = (role) => {
      setShowDetailsModal(true);
      setSelectedRoleId(role._id);
      useEffect(() => {
        console.log("showAssignModal:", showAssignModal);
        console.log("selectedRole:", selectedRole);
        
        if (!showAssignModal && selectedRole) {
          const rolePermissions = selectedRole?.permisos.map(nombre => permissionIdMap[nombre]);
          setSelectedPermissions(rolePermissions);
          console.log("Permisos seleccionados al cerrar el modal:", rolePermissions);
        }
      }, [showAssignModal, selectedRole]);
      
      
      
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
        setSelectedPermissions(updatedPermissions); 
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
                    className="px-6 py-3 bg-green-500 text-white border-b border-gray-300 cursor-pointer"
                    onClick={() => orderBy("name")}
                  >
                    Name{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  
                  
                  <th
                    className="px-6 py-3 bg-purple-500 text-white border-b border-gray-300 cursor-pointer"
                    onClick={() => orderBy("permissions")}
                  >
                    Permissions{" "}
                    {sortConfig.key === "permissions" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th className="px-6 py-3 bg-gray-500 text-white border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((role, index) => (
                  <tr key={index}>
                    <td className="border px-6 py-4">{generateIds()[index]}</td>
                    
                    <td className="border px-6 py-4">{role.nombre}</td>
                    <td className="border px-6 py-4">{role.permisos.join(", ")}</td>
                    
                    <td className="border px-6 py-4">
                      <Button type="primary" onClick={() => handleViewPermissions(role)}>View</Button>
                      <Button type="primary" onClick={() => handleAssignPermissions(role)}>Assign</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default DataTable;
