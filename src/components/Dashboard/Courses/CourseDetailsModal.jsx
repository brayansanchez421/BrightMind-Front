import React from "react";
import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";

const CourseDetailsModal = ({ visible, onClose, course }) => {
  const { t } = useTranslation("global");

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
            {t('courseDetails.detailsOfCourse')}
            <span className="font-bold ml-2">{course?.title}</span>
          </h1>
          <div className="mt-6">
            <p>
              <strong className="text-lg">{t('courseDetails.id')}</strong>
              <p className="text-base">{course._id}</p>
            </p>
            <p>
              <strong className="text-lg">{t('courseDetails.category')}</strong>
              <p className="text-base">{course.category}</p>
            </p>
            <p>
              <strong className="text-lg">{t('courseDetails.name')}</strong>
              <p className="text-base">{course.title}</p>
            </p>
            <p>
              <strong className="text-lg">{t('courseDetails.description')}</strong>
              <p className="text-base">{course.description}</p>
            </p>
            <h1 className="text-center text-lg font-bold mt-6">{t('courseDetails.imagePreview')}</h1>
            <div className="flex justify-center mt-2">
              {course.image && (
                <img
                  className="rounded-lg"
                  src={course.image}
                  alt={t('courseDetails.imagePreview')}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-neutral-700 text-base rounded-lg hover:bg-neutral-600 font-black text-white"
              onClick={onClose}
            >
              {t('courseDetails.close')}
            </button>
          </div>
        </div>
      ) : (
        <p>{t('courseDetails.noCourseSelected')}</p>
      )}
    </Modal>
  );
};

export default CourseDetailsModal;
