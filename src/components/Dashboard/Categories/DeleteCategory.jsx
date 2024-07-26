// components/DeleteCategory.js
import React from "react";
import { Modal, Button } from "antd";

const DeleteCategory = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      className="flex justify-center items-center mt-40"
      title="Confirm deletionzxd<a"
      visible={visible}
      onCancel={onClose}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this category?</p>
    </Modal>
  );
};

export default DeleteCategory;
