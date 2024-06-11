import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useRoleContext } from '../../../context/user/role.context';

const { Option } = Select;

const CreateUserModal = ({ visible, onCancel, onCreate }) => {
  const { rolesData } = useRoleContext();

  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Modal className="mt-14"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      <Form className="bg-blue-100 py-6 shadow-orange shadow-sky-300" 
      form={form} 
      layout="vertical">
        <h1 className="text-2xl text-center font-black">Create User</h1>
        <Form.Item className="text-base font-semibold mx-10 mt-4"
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter a username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-base font-semibold mx-10"
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-base font-semibold mx-10"
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
        <Form.Item className="text-base font-semibold mx-10"
          name="state"
          label="State"
          rules={[{ required: true, message: "Please select a state" }]}
        >
          <Select className="text-center" >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
          <div className="flex justify-center mt-10">
          <Button className="bg-rose-800 text-white font-medium"
          key="cancel" 
          onClick={onCancel}>
          Cancel
        </Button>,
        <Button className="bg-sky-700 font-medium"
        key="submit" 
        type="primary" 
        onClick={handleFormSubmit}>
          Create
        </Button>,
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
