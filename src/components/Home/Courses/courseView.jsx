import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCoursesContext } from '../../../context/courses/courses.context';
import { Collapse, Button, Modal } from 'antd';
import NavigationBar from '../NavigationBar';
import { FaArrowLeft } from 'react-icons/fa';
import jsPDF from 'jspdf';
import Logo from '../../../assets/img/hola.png'; // Importa el logo de tu empresa aquí

const { Panel } = Collapse;

const CourseView = () => {
    const { courseId } = useParams();
    const { getCourse } = useCoursesContext();
    const [course, setCourse] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Índice del recurso actualmente visible
    const [modalVisible, setModalVisible] = useState(false);
    const [currentViewedIndex, setCurrentViewedIndex] = useState(-1); // Índice del último recurso visualizado

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

    const handleContentClick = (index) => {
        if (index <= currentViewedIndex + 1) {
            setCurrentIndex(index);
            setCurrentViewedIndex(index); // Marcar como visto el recurso actual
            setModalVisible(true);
        }
    };

    const handleNext = () => {
        // Avanzar al siguiente recurso si el usuario ha visto el actual
        if (currentViewedIndex === currentIndex) {
            setCurrentIndex(currentIndex + 1);
            setCurrentViewedIndex(currentIndex + 1); // Marcar como visto el siguiente recurso
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        // Verificar si todos los recursos han sido vistos
        if (currentViewedIndex === course.content.length - 1) {
            generateCongratulationsPDF(); // Generar PDF de felicitación
        }
    };

    const generateCongratulationsPDF = () => {
        const doc = new jsPDF();

        // Logo de la empresa
        const imgData = Logo;
        doc.addImage(imgData, 'PNG', 75, 15, 60, 60); // Ajusta las coordenadas y el tamaño del logo según sea necesario

        // Estilos y texto
        doc.setFont('helvetica');
        doc.setTextColor('#333333');
        doc.setFontSize(22);

        // Encabezado con título del curso
        doc.text('¡Felicitaciones!', 105, 75, null, null, 'center');

        // Contenido personalizado
        doc.setFontSize(16);
        doc.setTextColor('#666666');
        doc.text(`Has completado el curso "${course.title}" exitosamente.`, 105, 95, null, null, 'center');

        // Mensaje adicional
        doc.setFontSize(14);
        doc.setTextColor('#999999');
        doc.text('Gracias por tu dedicación y esfuerzo.', 105, 115, null, null, 'center');

        // Estilo adicional para el mensaje
        doc.setFontSize(10);
        doc.setTextColor('#666666');
        doc.text('¡Sigue aprendiendo y mejorando!', 105, 135, null, null, 'center');

        // Guardar el PDF
        doc.save(`Felicitaciones_${course.title}.pdf`);
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
                                <Panel
                                    header={`Recurso ${index + 1}`}
                                    key={index}
                                    disabled={index > currentViewedIndex + 1} // Bloquear paneles de recursos no vistos
                                >
                                    <Button type="link" onClick={() => handleContentClick(index)}>
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
                afterClose={() => setCurrentIndex(0)} // Resetear el índice cuando se cierra el modal
            >
                {course.content && currentIndex < course.content.length && (
                    <>
                        {course.content[currentIndex].endsWith('.mp4') ? (
                            <video controls className="w-full">
                                <source src={course.content[currentIndex]} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        ) : course.content[currentIndex].endsWith('.pdf') ? (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(course.content[currentIndex])}`}
                                className="w-full"
                                style={{ minHeight: '400px' }}
                                frameBorder="0"
                            >
                                Tu navegador no soporta PDFs. Por favor descarga el PDF para verlo: <a href={course.content[currentIndex]}>Descargar PDF</a>
                            </iframe>
                        ) : (
                            <img src={course.content[currentIndex]} alt="Vista previa del contenido" className="w-full" />
                        )}
                        {currentViewedIndex === currentIndex && ( // Mostrar botón "Siguiente" solo si el recurso actual ha sido visto
                            <Button onClick={handleNext} className="mt-4">Siguiente</Button>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
};

export default CourseView;
