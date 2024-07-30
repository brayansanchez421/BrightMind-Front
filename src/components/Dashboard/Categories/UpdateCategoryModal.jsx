import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const UpdateCategoryModal = ({
  visible,
  onClose,
  onUpdate,
  form,
  imagePreview
}) => {
  const { t } = useTranslation("global");

  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      maskStyle={{ backdropFilter: "blur(15px)" }}
    >
      <div className='bg-gradient-to-r from-teal-400 to-blue-500 p-6'>
        <h1 className="text-center text-2xl font-bold text-white">
          {t('updateCategoryModal.title')}
        </h1>
        <Form form={form} onFinish={onUpdate} layout="vertical">
          <label className="text-lg font-semibold">
            {t('updateCategoryModal.nameLabel')}:
          </label>
          <Form.Item
            className="font-semibold mt-2"
            name="name"
            rules={[{ required: true, message: t('updateCategoryModal.namePlaceholder') }]}
          >
            <Input className="font-normal" />
          </Form.Item>
          <label className="text-lg font-semibold">
            {t('updateCategoryModal.descriptionLabel')}:
          </label>
          <Form.Item
            className="mt-2 font-normal"
            name="description"
            rules={[{ required: true, message: t('updateCategoryModal.descriptionPlaceholder') }]}
          >
            <Input.TextArea rows={3} className="" />
          </Form.Item>
          <div>
            <h1 className='text-center text-lg font-semibold'>
              {t('updateCategoryModal.imagePreview')}
            </h1>
          </div>
          {imagePreview && (
            <div className="flex justify-center mt-2">
              <img
                src={imagePreview}
                alt={t('updateCategoryModal.imagePreview')}
                className="rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            <button type="submit" className="bg-blue-600 font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 text-white">
              {t('updateCategoryModal.updateButton')}
            </button>
            <button
              type="button"
              className="bg-neutral-700 font-semibold px-4 py-2 rounded-xl hover:bg-neutral-600 text-white"
              onClick={onClose}
            >
              {t('updateCategoryModal.cancelButton')}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateCategoryModal;
