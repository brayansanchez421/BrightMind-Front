import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCoursesContext } from '../../../context/courses/courses.context';
import { Collapse, Button, Modal } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import NavigationBar from '../NavigationBar';
import { FaArrowLeft } from 'react-icons/fa';
import jsPDF from 'jspdf';
import Logo from '../../../assets/img/hola.png'; // Importa el logo de tu empresa aquí

const { Panel } = Collapse;

const CourseView = () => {
  const { courseId } = useParams();
  const { getCourse } = useCoursesContext();
  const [course, setCourse] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Error al obtener la información del curso:', error);
      }
    };

    fetchCourse();
  }, [courseId, getCourse]);

    const handleContentClick = (url) => {
        setSelectedContent(url);
        setModalVisible(true);
    };

  const handleCloseModal = () => {
    setSelectedContent(null);
    setModalVisible(false);
  };

  if (!course) return <div>Loading...</div>;

    return (
        <div className="min-h-screen overflow-auto overflow-x-hidden bg-gradient-to-t from-blue-200 via-blue-300 to-blue-400">
            <NavigationBar />
            <div className="max-w-screen-lg mx-auto bg-white p-3 rounded-lg shadow-md mt-20 mb-10">
                <div className="flex items-center mb-4">
                    <Link to="/MyCourses" className="flex items-center text-blue-600 hover:text-blue-800">
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/5 pr-8 text-center">
                        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                        <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <p className="text-lg mb-4">{course.description}</p>
                    </div>
                    <div className="md:w-2/5 mt-10">
                        <Collapse accordion>
                            {course.content && course.content.map((url, index) => (
                                <Panel header={`Recurso ${index + 1}`} key={index}>
                                    <Button type="link" onClick={() => handleContentClick(url)}>
                                        {url.endsWith('.mp4') ? 'Ver Video' : url.endsWith('.pdf') ? 'Ver PDF' : 'Ver Imagen'}
                                    </Button>
                                </Panel>
                            ))}
                        </Collapse>
                    </div>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                destroyOnClose
            >
                {selectedContent && (
                    <>
                        {selectedContent.endsWith('.mp4') ? (
                            <video controls className="w-full">
                                <source src={selectedContent} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        ) : selectedContent.endsWith('.pdf') ? (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(selectedContent)}`}
                                className="w-full"
                                style={{ minHeight: '400px' }}
                                frameBorder="0"
                            >
                                Tu navegador no soporta PDFs. Por favor descarga el PDF para verlo: <a href={selectedContent}>Descargar PDF</a>
                            </iframe>
                        ) : (
                            <img src={selectedContent} alt="Vista previa del contenido" className="w-full" />
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
};

export default CourseView;
