import React, { useState } from "react";
import { Modal, Spin } from "antd";
import { useTranslation } from "react-i18next";

const DeleteCategory = ({ visible, onClose, onConfirm }) => {
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Ensure `onConfirm` returns a Promise
    } catch (error) {
      console.error("Error confirming deletion:", error);
      // You might want to add error handling here
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      closable={false}
      visible={visible}
      onCancel={onClose}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      footer={null}
    >
      <div>
        <h1 className="text-xl text-center font-bold">
          {t("deleteCategory.confirmDeletion")}
        </h1>
        <h3 className="text-center text-base mt-4">
          {t("deleteCategory.confirmMessage")}
        </h3>
        <h3 className="text-base text-red-600 text-center mt-2 font-bold">
          {t("deleteCategory.warningMessage")}
        </h3>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 border border-red-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleConfirm}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <Spin size="small" /> : t("deleteCategory.confirmButton")}
          </button>
          <button
            className="bg-neutral-700 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-600 text-white"
            onClick={onClose}
            aria-label={t("deleteCategory.cancelButton")}
          >
            {t("deleteCategory.cancelButton")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
