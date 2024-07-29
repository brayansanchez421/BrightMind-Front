import React from "react";
import { Modal } from "antd";

const DetailsCategoryModal = ({ visible, onClose, category }) => {
  if (!category) return false; 

  return (
    <Modal 
    className="shadow-orange shadow-white border-2 border-black rounded-lg"  
    onCancel={onClose} 
    closable={false}
    visible={visible}
    centered
    maskStyle={{backdropFilter: "blur(15px)"}}
    footer={null} 
    >
      <div className="">
        <h1 className="text-center text-xl font-semibold">
          Details of category
          <span className="font-bold ml-2">{category.name}</span>
        </h1>
        <h3 className="mt-6 text-base font-bold">
          Name:<p className="font-normal">{category.name}</p>
        </h3>
        <h3 className="text-base font-bold">
          Description: <p className="font-normal">{category.description}</p>
        </h3>
        <h1 className="text-center text-lg font-bold mt-6">Image Preview</h1>
        <div className="flex justify-center mt-2">
        {category.image && (
          <img className="rounded-lg"
            src={category.image}
            alt="Category preview image"
          />
        )}
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
    </Modal>
  );
};

export default DetailsCategoryModal;
