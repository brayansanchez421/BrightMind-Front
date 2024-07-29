import React from "react";
import { Modal, Button } from "antd";

const CourseDetailsModal = ({ visible, onClose, course }) => {
  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      visible={visible}
      onCancel={onClose}
      maskStyle={{ backdropFilter: "blur(15px)" }}
      footer={null}
      closable={false}
    >
      {course ? (
        <div>
          <h1 className="text-center text-xl font-semibold">
            Details of course:
            <span className="font-bold ml-2">{course?.title}</span>
          </h1>
          <div className="mt-6">
            <p>
              <strong className="text-lg">ID:</strong>
              <p className=" text-base">{course._id}</p>
            </p>
            <p>
              <strong className="text-lg">Category:</strong>
              <p className="text-base">{course.category}</p>
            </p>
            <p>
              <strong className="text-lg">Name:</strong>{" "}
              <p className="text-base">{course.title}</p>
            </p>
            <p>
              <strong className="text-lg">Description:</strong>
              <p className="text-base">{course.description}</p>
            </p>
            <h1 className="text-center text-lg font-bold mt-6">Image Preview</h1>
            <div className="flex justify-center mt-2">
              {course.image && (
                <img
                  className="rounded-lg"
                  src={course.image}
                  alt="Course preview image"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
          <button 
          className="px-4 py-2 bg-neutral-700 text-base rounded-lg hover:bg-neutral-600 font-black text-white"
          onClick={onClose}
          >  
            Close
          </button>
          </div>
        </div>
      ) : (
        <p>No course selected</p>
      )}
    </Modal>
  );
};

export default CourseDetailsModal;
