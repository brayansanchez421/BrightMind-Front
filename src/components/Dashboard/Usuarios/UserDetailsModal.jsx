import React from "react";
import { Modal, Button } from "antd";
import { BackwardFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const DetailsUserModal = ({ visible, onCancel, user }) => {
  const { t } = useTranslation("global");
  return (
    <Modal 
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      maskStyle={{ backdropFilter: "blur(15px)" }}
      footer={null}
    >
      {user && (
        <div className="">
          <h1 className="text-center text-xl font-bold">{t('userDetails.title')}</h1>
          <div>
            <strong className="font-semibold text-lg">{t('userDetails.id')}:</strong> {user._id}
          <p>
            <strong className="font-semibold text-lg">{t('userDetails.name')}:</strong> {user.username}
          </p>
          <p>
            <strong className="font-semibold text-lg">{t('userDetails.email')}:</strong> {user.email}
          </p>
          <p>
            <strong className="font-semibold text-lg">{t('userDetails.role')}:</strong> {user.role}
          </p>
          <p>
            <strong className="font-semibold text-lg">{t('userDetails.status')}:</strong> {user.state ? t('userDetails.active') : t('userDetails.inactive')}
          </p>
          </div>
          <div className="flex justify-center">
            <button 
              className="bg-neutral-700 hover:bg-neutral-600 text-white font-medium px-4 py-2 rounded-lg" 
              onClick={onCancel}
            >
              {t('userDetails.close')}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailsUserModal;