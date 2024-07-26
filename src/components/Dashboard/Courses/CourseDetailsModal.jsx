import React from "react";
import { Modal } from "antd";

const CourseDetailsModal = ({ visible, course, onClose }) => {
  return (
    <Modal
      className="shadow-lg shadow-blue-500"
      title={`Course Details: ${course ? course.title : ''}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      {course && (
        <div className="p-4">
          <p><b>ID:</b> {course._id}</p>
          <p><b>Category:</b> {course.category}</p>
          <p><b>Name:</b> {course.title}</p>
          <p><b>Description:</b> {course.description}</p>
          {course.previewImage && (
            <div className="mt-4">
              <p><b>Preview Image:</b></p>
              <img
                src={course.previewImage}
                alt={`Preview of ${course.title}`}
                className="w-full max-h-60 object-cover mt-2"
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default CourseDetailsModal;
