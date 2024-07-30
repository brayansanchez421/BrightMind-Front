import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCategoryContext } from "../../../context/courses/category.context";
import { useTranslation } from "react-i18next";

const CreateCategoryForm = ({ visible, onClose }) => {
  const { t } = useTranslation("global");
  const { createCategory } = useCategoryContext();

  const [category, setCategory] = useState({ name: "", description: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_DESCRIPTION_LENGTH = 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setCategory({ ...category, image: imageFile });
      setImagePreview(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name || !category.description || !category.image) {
      setErrorMessage(t("createCategoryForm.errorMessage"));
      return;
    }

    try {
      await createCategory(category);
      toast.success(t("createCategoryForm.successMessage"), { autoClose: 3000 });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error(t("createCategoryForm.errorToastMessage"));
    }
  };

  useEffect(() => {
    if (visible) {
      setCategory({ name: "", description: "", image: null });
      setImagePreview(null);
      setErrorMessage("");
    }
  }, [visible]);

  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      visible={visible}
      footer={null}
      closable={false}
      onCancel={onClose}
      maskStyle={{ backdropFilter: "blur(15px)" }}
    >
      <form
        className="w-full p-6 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-lg shadow-lg relative"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-white">{t("createCategoryForm.title")}</h1>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              {t("createCategoryForm.nameLabel")} <br />
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-teal-300"
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              {t("createCategoryForm.descriptionLabel")} <br />
              <Input.TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-teal-300"
                name="description"
                value={category.description}
                onChange={handleChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
                style={{ minHeight: "100px" }}
                required
              />
              <div className="text-gray-300 mt-1 text-right">{category.description.length}/{MAX_DESCRIPTION_LENGTH}</div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black text-lg font-medium mb-2">
              {t("createCategoryForm.imageLabel")} <br />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=" p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-teal-300 hover:bg-red-100"
                required
              />
            </label>
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img src={imagePreview} alt="preview" className="rounded-lg" style={{ maxWidth: "100%", maxHeight: "200px" }} />
              </div>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            htmlType="submit"
          >
            {t("createCategoryForm.createButton")}
          </Button>
          <Button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            {t("createCategoryForm.cancelButton")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategoryForm;
