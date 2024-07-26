import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useRoleContext } from '../../../context/user/role.context';
import { useUserContext } from '../../../context/user/user.context'; // Importa el contexto de usuario
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const CreateUserModal = ({ visible, onCancel, onCreate }) => {
  const { rolesData } = useRoleContext();
  const { checkIfUserExists } = useUserContext();
  const [form] = Form.useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const { t } = useTranslation("global");

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { username, email } = values;

      // Verifica si el usuario ya existe
      if (checkIfUserExists(username, email)) {
        message.error(t("CreateUserModal.userExists"));
        return;
      }

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
        className="bg-gradient-to-r from-blue-400 to-green-400 py-6 shadow-lg rounded p-6"
        form={form} 
        layout="vertical"
      >
        <h1 className="text-2xl text-center font-black mb-6">{t("CreateUserModal.createUserTitle")}</h1>
        <Form.Item 
          className="text-base font-semibold mx-10 mt-4"
          name="username"
          label={t("CreateUserModal.username")}
          rules={[{ required: true, message: t("CreateUserModal.usernameRequired") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          className="text-base font-semibold mx-10"
          name="email"
          label={t("CreateUserModal.email")}
          rules={[
            { required: true, message: t("CreateUserModal.emailRequired") },
            { type: 'email', message: t("CreateUserModal.emailInvalid") }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          className="text-base font-semibold mx-10"
          name="role"
          label={t("CreateUserModal.role")}
          rules={[{ required: true, message: t("CreateUserModal.roleRequired") }]}
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
          label={t("CreateUserModal.state")}
          rules={[{ required: true, message: t("CreateUserModal.stateRequired") }]}
        >
          <Select className="text-center">
            <Option value={true}>{t("CreateUserModal.active")}</Option>
            <Option value={false}>{t("CreateUserModal.inactive")}</Option>
          </Select>
        </Form.Item>
        <div className="flex justify-center mt-10">
          <Button 
            className="bg-gray-600 text-white font-medium"
            key="cancel" 
            onClick={handleModalClose}
          >
            {t("CreateUserModal.cancel")}
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-4"
            key="submit" 
            type="primary" 
            onClick={handleFormSubmit}
          >
            {t("CreateUserModal.create")}
          </Button>
        </div>
      </Form>

      {/* Mostrar mensaje de éxito */}
      {successMessageVisible && (
        message.success({
          content: t("CreateUserModal.userCreatedSuccess"),
          duration: 5, // Duración en segundos que se muestra el mensaje
        })
      )}
    </Modal>
  );
};

export default CreateUserModal;
