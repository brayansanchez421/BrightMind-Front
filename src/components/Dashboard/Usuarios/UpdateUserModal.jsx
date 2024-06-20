import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useRoleContext } from '../../../context/user/role.context';

const { Option } = Select;

const UpdateUserModal = ({ visible, onCancel, onUpdate, user }) => {
  const { rolesData } = useRoleContext();
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(user);
    }
  }, [visible, user, form]);

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
    } catch (error) {
      console.error("Fallo al actualizar el usuario:", error);
    }
  };

  return (
    <Modal
      className="mt-6"
      visible={visible}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        className="py-6 bg-blue-100 shadow-orange shadow-sky-300"
        form={form}
        layout="vertical"
        initialValues={user}
      >
        <h1 className="text-xl font-black text-center">Actualizar Usuario</h1>
        <Form.Item
          className="text-base font-semibold mx-10 mt-4"
          name="username"
          label="Nombre de Usuario"
          rules={[{ required: true, message: "Por favor ingrese un nombre de usuario" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-base font-semibold mx-10"
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, message: "Por favor ingrese un correo electrónico" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-base font-semibold mx-10"
          name="role"
          label="Rol"
          rules={[{ required: true, message: "Por favor seleccione un rol" }]}
        >
          <Select className="text-center">
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
          label="Estado"
          rules={[{ required: true, message: "Por favor seleccione un estado" }]}
        >
          <Select className="text-center">
            <Option value={true}>Activo</Option>
            <Option value={false}>Inactivo</Option>
          </Select>
        </Form.Item>
        <div className="flex justify-center mt-10">
          <Button
            className="bg-rose-800 text-white font-medium"
            key="cancel"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            className="bg-sky-700 font-medium ml-2"
            key="submit"
            type="primary"
            onClick={handleFormSubmit}
          >
            Actualizar
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
