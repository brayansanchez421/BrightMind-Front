import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useRoleContext } from '../../../context/user/role.context';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const UpdateUserModal = ({ visible, onCancel, onUpdate, user }) => {
  const { rolesData } = useRoleContext();
  const [form] = Form.useForm();
  const { t } = useTranslation("global");

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(user);
    }
  }, [visible, user, form]);

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
      onCancel(); // Close the modal
      toast.success(t('UpdateUserModal.userUpdatedSuccess'), { autoClose: 1000 });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <>
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
          <h1 className="text-xl font-black text-center">
            {t('UpdateUserModal.updateUserTitle')}
          </h1>
          <Form.Item
            className="text-base font-semibold mx-10 mt-4"
            name="username"
            label={t('UpdateUserModal.username')}
            rules={[{ required: true, message: t('UpdateUserModal.usernameRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="text-base font-semibold mx-10"
            name="email"
            label={t('UpdateUserModal.email')}
            rules={[{ required: true, message: t('UpdateUserModal.emailRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="text-base font-semibold mx-10"
            name="role"
            label={t('UpdateUserModal.role')}
            rules={[{ required: true, message: t('UpdateUserModal.roleRequired') }]}
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
            label={t('UpdateUserModal.state')}
            rules={[{ required: true, message: t('UpdateUserModal.stateRequired') }]}
          >
            <Select className="text-center">
              <Option value={true}>{t('UpdateUserModal.active')}</Option>
              <Option value={false}>{t('UpdateUserModal.inactive')}</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-center mt-10">
            <Button
              className="bg-rose-800 text-white font-medium"
              key="cancel"
              onClick={onCancel}
            >
              {t('UpdateUserModal.cancel')}
            </Button>
            <Button
              className="bg-sky-700 font-medium ml-2"
              key="submit"
              type="primary"
              onClick={handleFormSubmit}
            >
              {t('UpdateUserModal.update')}
            </Button>
          </div>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UpdateUserModal;
