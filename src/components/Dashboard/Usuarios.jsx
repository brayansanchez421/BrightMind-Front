import React, { useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import { Button, Modal, Form, Input, Select } from "antd";
import { ReloadOutlined, CheckOutlined, InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useUserContext } from "../../context/user/user.context";
import logo from "../../assets/img/hola.png";
import { useRoleContext } from '../../context/user/role.context';
import Navbar from "./NavBar";

const { Option } = Select;

const DataTable = () => {
  const { rolesData } = useRoleContext();
  const { getUsers, usersData, activateAccount, updateUser, createUser } = useUserContext();
  const [updatedDataFlag, setUpdatedDataFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [form] = Form.useForm();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const filteredUsers = usersData.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getUsers();
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
    console.log("ID del usuario al cerrar el modal de actualización:", selectedUser?._id);
    if (selectedUser) {
      updateUser(selectedUser._id, { ...selectedUser });
    }
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const handleCreateFormSubmit = async (values) => {
    try {
      console.log(values);
      await createUser(values);
      form.resetFields();
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const generateIds = () => {
    return currentItems.map((_, index) => index + 1 + (currentPage - 1) * itemsPerPage);
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 ">
      <div className="flex h-screen overflow-hidden">
        <LeftBar />
        <div className="w-full">
          <Navbar />
          <div className="flex flex-col mt-10">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white text-center">Users</h2>
              <div className="flex items-center mb-4 mt-10 justify-center">
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
              <div className="overflow-x-auto mt-10 flex justify-center">
                <table className="w-10/12">
                  <thead>
                    <tr>
                      <th
                        className="text-xl px-6 py-3 bg-blue-500 text-white border-2 cursor-pointer border-blue-800"
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
                        className="text-xl px-6 py-3 bg-yellow-500 text-white border-2 cursor-pointer border-blue-800"
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
                        className="text-xl px-6 py-3 bg-green-500 text-white border-2 cursor-pointer border-blue-800"
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
                        className="text-xl px-6 py-3 bg-purple-500 text-white border-2 cursor-pointer border-blue-800"
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
                        className="text-xl px-6 py-3 bg-red-500 text-white border-2 border-blue-800"
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
                      <th className="px-6 py-3 bg-gray-500 text-white text-xl border-2 border-blue-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{generateIds()[index]}</td>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{item.role}</td>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{item.username}</td>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">{item.email}</td>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                          {item.state ? "Active" : "Inactive"}
                        </td>
                        <td className="border-2 border-blue-800 px-6 py-4 bg-gray-300 text-lg text-black mt-1">
                          <button
                            onClick={() => handleActivateAccount(item._id)}
                            className={`${
                              item.state ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
                            } text-white font-bold py-2 px-4 rounded`}
                          >
                            {item.state ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleUpdateButtonClick(item)}
                            className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUserId(item._id);
                              setShowDetailsModal(true);
                            }}
                            className="bg-purple-500 hover:bg-zinc-300 text-white font-bold py-2 px-4 rounded ml-2"
                          >
                            <InfoCircleOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentItems.length < itemsPerPage}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Create User Modal */}
          <Modal
            title="Create User"
            visible={showForm}
            onCancel={() => setShowForm(false)}
            footer={null}
          >
            <Form form={form} onFinish={handleCreateFormSubmit}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter a username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter an email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select>
                  {rolesData.map((role) => (
                    <Option key={role.id} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="state"
                label="State"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select a state" }]}
              >
                <Select>
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Update User Modal */}
          <Modal
            title="Update User"
            visible={showUpdateModal}
            onCancel={handleCloseUpdateModal}
            footer={null}
          >
            <Form form={form} onFinish={handleUpdateUser}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter a username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter an email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select>
                  {rolesData.map((role) => (
                    <Option key={role.id} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="state"
                label="State"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select a state" }]}
              >
                <Select>
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* User Details Modal */}
          <Modal
            title="User Details"
            visible={showDetailsModal}
            onCancel={() => setShowDetailsModal(false)}
            footer={[
              <Button key="close" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>,
            ]}
          >
            {selectedUser && (
              <div>
                <p>
                  <strong>ID:</strong> {selectedUser._id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedUser.state ? "Active" : "Inactive"}
                </p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
