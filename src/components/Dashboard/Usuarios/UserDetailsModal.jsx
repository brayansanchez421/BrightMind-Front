import React from "react";
import { Modal, Button } from "antd";
import { BackwardFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const DetailsUserModal = ({ visible, onCancel, user }) => {
  const { t } = useTranslation("global");
  return (
    <Modal 
      className="mt-28 transition-all duration-300"
      visible={visible}
      onCancel={onCancel}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      footer={null}
    >
      {user && (
        <div className="bg-blue-100 py-6 shadow-orange shadow-sky-300">
          <h1 className="text-center text-xl font-black">{t('userDetails.title')}</h1>
          <p className="mt-6">
            <strong className="ml-10">{t('userDetails.id')}:</strong> {user._id}
          </p>
          <p>
            <strong className="ml-10">{t('userDetails.name')}:</strong> {user.username}
          </p>
          <p>
            <strong className="ml-10">{t('userDetails.email')}:</strong> {user.email}
          </p>
          <p>
            <strong className="ml-10">{t('userDetails.role')}:</strong> {user.role}
          </p>
          <p>
            <strong className="ml-10">{t('userDetails.status')}:</strong> {user.state ? t('userDetails.active') : t('userDetails.inactive')}
          </p>
          <div className="flex justify-center">
            <Button 
              className="bg-sky-500 text-white font-medium mt-10" 
              key="close" 
              onClick={onCancel}
            >
              {t('userDetails.close')}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailsUserModal;