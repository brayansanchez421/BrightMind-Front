import { useState, useEffect } from "react";
import LeftBar from "./LeftBar"; // Import Sidebar component
import { Button, Modal, Form, Input, Select } from "antd"; // Import Ant Design components

import {
  ReloadOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { useUserContext } from "../../context/user/user.context";
import logo from "../../assets/img/hola.png";
import { getUser } from "../../api/user/user.request";
import { useRoleContext } from '../../context/user/role.context';


const { Option } = Select;

const DataTable = () => {
  const { rolesData } = useRoleContext(); // Obtén los roles del contexto

  const { getUsers, usersData, activateAccount, updateUser } = useUserContext();
  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [form] = Form.useForm();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Nuevo estado
  const [selectedUserNumericId, setSelectedUserNumericId] = useState(null);


  const [selectedUser, setSelectedUser] = useState(null);
123
  
  useEffect(() => {
    if (selectedUserId) {
      setSelectedUser(usersData.find((user) => user._id === selectedUserId));
    }
  }, [selectedUserId, usersData]);
  useEffect(() => {
    form.setFieldsValue({
      username: selectedUser?.username,
      email: selectedUser?.email,
      role: selectedUser?.role,
      state: selectedUser?.state ? true : false,
    });
  }, [selectedUser, form]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const generateIds = () => {
    return currentItems.map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };
  const filteredUsers = usersData.filter((user) =>
  Object.values(user).some(
    (value) =>
      value &&
      typeof value === "string" &&
      value.toLowerCase().includes(searchValue.toLowerCase())
  )
);
console.log("usuarios: ", filteredUsers)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getUsers();
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
  }, [usersData, updatedDataFlag]);

  const handleActivateAccount = (userId) => {
    setUpdatedDataFlag(true);
    activateAccount(userId);
  };

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
    let sortableData = [...usersData];
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
    .filter((item) => filteredUsers.includes(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFormSubmit = (values) => {
    const newUser = {
      id: usersData.length + 1,
      ...values,
    };
    setData([...usersData, newUser]);
    setShowForm(false);
  };

  useEffect(() => {
    console.log("ID del usuario a actualizar:", selectedUser?._id);
  }, [selectedUser]);
  const handleUpdateButtonClick = (item) => {
    console.log("ID del usuario seleccionado para actualizar:", item._id);
    setSelectedUser(item);
    setShowUpdateModal(true);
  };

  const handleUpdateUser = (values) => {
    const { username, email, role, state } = values;
    updateUser(selectedUser._id, { username, email, role, state });
    setShowUpdateModal(false);
    setUpdatedDataFlag(true);
    setSelectedUser(null);
  };
  
  
  const handleCloseUpdateModal = () => {
    console.log(
      "ID del usuario al cerrar el modal de actualización:",
      selectedUser?._id
    );
    if (selectedUser) {
      updateUser(selectedUser._id, { ...selectedUser });
    }
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    console.log("ID del usuario a actualizar:", selectedUser?._id);
  }, [selectedUser]);

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 ">
    <div className="flex h-screen overflow-hidden  ">
      <LeftBar />
      
      <div className="ml-10 flex flex-col ">
      
        <div>
        
          <h2 className="text-4xl font-bold mb-4 text-white ">Users</h2>
          <div className="flex items-center mb-4">
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => setShowForm(true)}
              className="mr-4"
            >
              <b>Create User</b>
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
                  <th
                    className="text-xl px-6 py-3 bg-blue-500 text-white border  cursor-pointer  border-blue-800"
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
                    className="text-xl px-6 py-3 bg-yellow-500 text-white  border cursor-pointer  border-blue-800"
                    onClick={() => orderBy("role")}
                  >
                    Role{" "}
                    {sortConfig.key === "role" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th
                    className="text-xl px-6 py-3 bg-green-500 text-white  border cursor-pointer  border-blue-800"
                    onClick={() => orderBy("username")}
                  >
                    Name{" "}
                    {sortConfig.key === "username" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th
                    className="text-xl px-6 py-3 bg-purple-500 text-white  border cursor-pointer  border-blue-800"
                    onClick={() => orderBy("email")}
                  >
                    Email{" "}
                    {sortConfig.key === "email" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th
                    className="text-xl px-6 py-3 bg-red-500 text-white border  border-blue-800"
                    onClick={() => orderBy("state")}
                  >
                    Status{" "}
                    {sortConfig.key === "state" &&
                      (sortConfig.direction === "ascending" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      ))}
                  </th>
                  <th className="px-6 py-3 bg-gray-500 text-white text-xl border border-blue-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{generateIds()[index]}</td>
                    <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{item.role}</td>
                    <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{item.username}</td>
                    <td className="border border-blue-800 px-6 py-4 bg-gray-300 tet-lg text-black mt-1">{item.email}</td>
                    <td className="border border-blue-800 px-6 py-4 bg-gray-300 tet-lg text-black mt-1">
                      {item.state ? "Active" : "Inactive"}
                  </td>
                  <td className="border border-blue-800 px-6 py-4 bg-gray-300 text-lg">
                      <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        className="mr-2 bg-blue-900 border-0 hover:bg-blue-300 border-blue-800
                        "
                        onClick={() => handleUpdateButtonClick(item)}
                      >
                        Update
                      </Button>

                      <Button
                        icon={<CheckOutlined />}
                        onClick={() => handleActivateAccount(item._id)}
                        className="mr-2 bg-blue-900 hover:bg-blue-300 border-slate-300 text-white"
                      >
                        Status
                      </Button>
                      <Button
                        icon={<InfoCircleOutlined />}
                        onClick={() => {
                          setShowDetailsModal(true);
                          setSelectedUser(item);
                          
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
        <Modal
          title="Create User"
          visible={showForm}
          onCancel={() => setShowForm(false)}
          footer={null}
        >
          <Form
            name="createUserForm"
            initialValues={{ remember: true }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter the role" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select the status" }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "blue" }}
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
  title={<span className="font-bold text-orange-500 flex items-center justify-center h-full">Update User</span>}
  visible={showUpdateModal}
  onCancel={handleCloseUpdateModal}
  footer={null}
  centered
  maskStyle={{ backdropFilter: "blur(10px)" }}
>
  <Form
    form={form}
    name="updateUserForm"
    initialValues={{
      username: selectedUser?.username,
      email: selectedUser?.email,
      role: selectedUser?.role,
      state: selectedUser?.state ? "true" : "false",
    }}
    onFinish={handleUpdateUser}
    labelAlign="right"  
    labelCol={{ span: 6 }}  
    wrapperCol={{ span: 14 }}  
  >
    <Form.Item
      label="username"
      name="username"
      rules={[{ required: true, message: "Please enter the username" }]}
    >
      <Input style={{ marginLeft: "8px" }} /> 
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please enter the email" }]}
    >
      <Input style={{ marginLeft: "8px" }} />
    </Form.Item>


    <Form.Item
      label="Role"
      name="role"
      rules={[{ required: true, message: "Please select the role" }]}
    >
      <Select style={{ width: "100%" }}>
        {rolesData.map(role => (
          <Option key={role._id} value={role.nombre}>
            {role.nombre}
          </Option>
        ))}
      </Select>
    </Form.Item>



    <Form.Item
      label="Status"
      name="state"
      rules={[{ required: true, message: "Please select the state" }]}
    >
      <Select style={{ marginLeft: "8px" }}>
        <Option value={true}>Active</Option>
        <Option value={false}>Inactive</Option>
      </Select>
    </Form.Item>

    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
      <Button
        type="primary"
        htmlType="submit"
        style={{ backgroundColor: "orange", marginLeft: "auto", marginRight: 0 }}
      >
        Update
      </Button>
    </Form.Item>
  </Form>
</Modal>



        <Modal
          title={
            <span className="font-bold text-orange-500">User Details</span>
          }
          visible={showDetailsModal}
          onCancel={() => setShowDetailsModal(false)}
          footer={null}
          centered
          maskStyle={{ backdropFilter: "blur(10px)" }}
        >
          {selectedUser && (
            <div className="bg-white p-4 rounded-md shadow-orange">
              <p>
              <b>ID:</b> {generateIds()[filteredUsers.indexOf(selectedUser)]}
              </p>
              <p>
                <b>Role:</b> {selectedUser.role}
              </p>
              <p>
                <b>Name:</b> {selectedUser.username}
              </p>
              <p>
                <b>Email:</b> {selectedUser.email}
              </p>
              <div className="flex items-center justify-end">
                <img
                  src={logo}
                  alt="Inactive"
                  className={`w-8 h-8 inline ${
                    selectedUser.state ? "" : "opacity-50"
                  }`}
                  style={{ cursor: "help" }}
                />
                <span className="ml-1">
                  {selectedUser.state ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
          )}
            {console.log("Selected User:", selectedUser)}

        </Modal>
      </div>
    </div>
    </div>
  );
};

export default DataTable;
