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
    <Modal
      title="Create User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
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
          rules={[{ required: true, message: "Please select a state" }]}
        >
          <Select>
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
