import React, { useCallback, useState, useRef, useEffect } from "react";
import { Modal, Button, Collapse, notification, Spin } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const { Panel } = Collapse;
const ALLOWED_FILE_TYPES = ['.mov', '.mp4', '.docx', '.pdf', '.jpg', '.png'];

const AssignContentModal = ({
  visible,
  onClose,
  onAssignContent,
  selectedCourse,
  setContentFile,
  handleRemoveResource,
}) => {
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const videoRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    if (!visible) {
      resetState();
    }
  }, [visible]);

  const resetState = () => {
    setFileSelected(null);
    setLoading(false);
    if (videoRefs.current) videoRefs.current.forEach(video => video.pause());
    if (imgRefs.current) imgRefs.current.forEach(img => (img.src = ""));
  };

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (ALLOWED_FILE_TYPES.includes(`.${fileExtension}`)) {
      setFileSelected(file);
      setContentFile(file);
    } else {
      notification.warning({
        message: 'Invalid File Type',
        description: 'Only ".mov" , ".mp4" , ".docx" , ".pdf" , ".jpg", ".npg" and .jpg files are allowed.',
        duration: 3,
      });
      e.target.value = '';
      setFileSelected(null);
    }
  }, [setContentFile]);

  const handleAssignContent = useCallback(async () => {
    if (!fileSelected) {
      notification.warning({
        message: 'No File Selected',
        description: 'Please select a file to assign',
        duration: 3,
      });
      return;
    }

    if (!selectedCourse) {
      notification.error({
        message: 'Course Error',
        description: 'No course selected.',
        duration: 3,
      });
      return;
    }

    setLoading(true);
    try {
      await onAssignContent();
      notification.success({
        message: 'Content Assigned Successfully',
        duration: 3,
      });
      onClose();
    } catch (error) {
      notification.error({
        message: 'Error Assigning Content',
        description: error.message || 'An error occurred while assigning content.',
        duration: 3,
      });
    } finally {
      setLoading(false);
      setFileSelected(null);
    }
  }, [fileSelected, onAssignContent, onClose, selectedCourse]);

  const handleCancel = () => {
    resetState();
    onClose();

  };

  return (
    <Modal
      className="shadow-orange shadow-white border-2 border-black rounded-lg"
      centered
      visible={visible}
      closable={false}
      onCancel={handleCancel}
      maskStyle={{ backdropFilter: "blur(15px)" }}
      footer={null}
    >
      <div className="bg-gradient-to-tl from-teal-400 to-blue-500 p-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <h1 className="font-bold text-center text-2xl text-white mb-4">
              Agregar Contenido A <span className="font-black">{selectedCourse?.title || ""}</span>
            </h1>
            {selectedCourse?.content?.length ? (
              <Collapse className="mt-6 bg-white border-2 border-black">
                {selectedCourse.content.map((url, index) => (
                  <Panel
                    className="hover:bg-slate-400"
                    header={
                      <div className="flex justify-between items-center">
                        <span>Recurso {index + 1}</span>
                        <Button
                          type="danger"
                          icon={<DeleteFilled />}
                          onClick={() => handleRemoveResource(index)}
                        />
                      </div>
                    }
                    key={index}
                  >
                    {url.endsWith(".mp4") ? (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        controls
                        className="w-full mb-4"
                      >
                        <source src={url} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : url.endsWith(".pdf") ? (
                      <div>
                        <p>Descargar PDF:</p>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                          download
                        >
                          {`Descargar PDF - Recurso ${index + 1}`}
                        </a>
                      </div>
                    ) : (
                      <img
                        ref={(el) => (imgRefs.current[index] = el)}
                        src={url}
                        alt={`Vista previa del curso ${index}`}
                        className="w-full mb-4"
                      />
                    )}
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <p className="text-center text-white">No hay recursos asignados.</p>
            )}
          </>
        )}
        <div className="mt-4">
          <label className="block text-lg font-bold mb-4">
            Assign Resource:
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full py-2 px-3 text-gray-800 border rounded mt-2"
            />
          </label>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleAssignContent}
            >
              Asignar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(AssignContentModal);
