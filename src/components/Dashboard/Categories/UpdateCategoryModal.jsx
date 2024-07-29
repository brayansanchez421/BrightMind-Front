import React from 'react';
import { Modal, Form, Input } from 'antd';

const UpdateCategoryModal = ({
  visible,
  onClose,
  onUpdate,
  form,
  imagePreview
}) => {
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
        <h1 className="text-center text-2xl font-bold text-white">Update Category</h1>
        <Form form={form} onFinish={onUpdate} layout="vertical">
          <label className="text-lg font-semibold">Name:</label>
          <Form.Item
            className="font-semibold mt-2"
            name="name"
            rules={[{ required: true, message: "Please input the category name!" }]}
          >
            <Input className="font-normal" />
          </Form.Item>
          <label className="text-lg font-semibold">Description:</label>
          <Form.Item
            className="mt-2 font-normal"
            name="description"
            rules={[{ required: true, message: "Please input the category description!" }]}
          >
            <Input.TextArea rows={3} className="" />
          </Form.Item>
          <div><h1 className='text-center text-lg font-semibold'>Image Preview</h1></div>
          {imagePreview && (
            <div className="flex justify-center mt-2">
              <img
                src={imagePreview}
                alt="Category image preview"
                className="rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            <button type="submit" className="bg-blue-600 font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 text-white">
              Update
            </button>
            <button
              type="button"
              className="bg-neutral-700 font-semibold px-4 py-2 rounded-xl hover:bg-neutral-600 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateCategoryModal;
