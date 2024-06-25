import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useRoleContext } from '../../../context/user/role.context';

const { Option } = Select;

const CreateUserModal = ({ visible, onCancel, onCreate }) => {
  const { rolesData } = useRoleContext();
  const [form] = Form.useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      setSuccessMessageVisible(true); // Mostrar el mensaje de éxito
      form.resetFields();
      onCancel(); // Cerrar el modal después de crear el usuario
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleModalClose = () => {
    setSuccessMessageVisible(false); // Ocultar el mensaje si se cierra el modal
    onCancel(); // Cerrar el modal
  };

  return (
    <Modal 
      className="mt-6"
      visible={visible}
      onCancel={handleModalClose}
      footer={null}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      afterClose={() => setSuccessMessageVisible(false)} // Asegurar que se oculte el mensaje después de cerrar el modal
    >
      <Form 
        className="bg-blue-100 py-6 shadow-orange shadow-sky-300" 
        form={form} 
        layout="vertical"
      >
        <h1 className="text-2xl text-center font-black">Create User</h1>
        <Form.Item 
          className="text-base font-semibold mx-10 mt-4"
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter a username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          className="text-base font-semibold mx-10"
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          className="text-base font-semibold mx-10"
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select>
            {rolesData.map((role) => (
              <Option key={role._id} value={role.nombre}>
                {role.nombre}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
          className="text-base font-semibold mx-10"
          name="state"
          label="State"
          rules={[{ required: true, message: "Please select a state" }]}
        >
          <Select className="text-center">
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
        <div className="flex justify-center mt-10">
          <Button 
            className="bg-rose-800 text-white font-medium"
            key="cancel" 
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-sky-700 font-medium ml-2"
            key="submit" 
            type="primary" 
            onClick={handleFormSubmit}
          >
            Create
          </Button>
        </div>
      </Form>

      {/* Mostrar mensaje de éxito */}
      {successMessageVisible && (
        message.success({
          content: "Usuario creado exitosamente",
          duration: 5, // Duración en segundos que se muestra el mensaje
        })
      )}
    </Modal>
  );
};

export default CreateUserModal;
