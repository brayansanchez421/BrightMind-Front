import React from "react";
import { Modal, Button } from "antd";
import { BackwardFilled } from "@ant-design/icons";

const DetailsUserModal = ({ visible, onCancel, user }) => {
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
          <h1 className="text-center text-xl font-black">User Details</h1>
          <p className="mt-6">
            <strong className="ml-10">ID:</strong> {user._id}
          </p>
          <p>
            <strong className="ml-10" >Name:</strong> {user.username}
          </p>
          <p>
            <strong className="ml-10">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="ml-10">Role:</strong> {user.role}
          </p>
          <p>
            <strong className="ml-10">Status:</strong> {user.state ? "Active" : "Inactive"}
          </p>
          <div className="flex justify-center">
          <Button 
            className="bg-sky-500 text-white font-medium mt-10" 
            key="close" 
            onClick={onCancel}
          >
            Close
          </Button>
        </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailsUserModal;
