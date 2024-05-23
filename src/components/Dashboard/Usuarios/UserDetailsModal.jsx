import React from "react";
import { Modal, Button } from "antd";

const DetailsUserModal = ({ visible, onCancel, user }) => {
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      {user && (
        <div>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Status:</strong> {user.state ? "Active" : "Inactive"}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default DetailsUserModal;
