import React from "react";
import { Modal, Button } from "antd";

const DeleteConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      visible={visible}
      onCancel={onClose}
      closable={false}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      footer={null}
    >
      <div className="">
        <h1 className="text-xl text-center font-bold">
          Confirm Deletion
        </h1>
        <h3 className="text-center text-base mt-4 ">
          ¿Are you sure you want to delete this category?
        </h3>
        <h3 className="text-base text-red-600 text-center mt-2 font-bold">
          This action cannot be undone.
        </h3>
        <div className="flex justify-center space-x-4 mt-6">
          <button 
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 border border-red-700"
          onClick={onConfirm}
          >Confirm
          </button>
          <button 
          className="bg-neutral-700 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-600 text-white"
          onClick={onClose}
          >Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
