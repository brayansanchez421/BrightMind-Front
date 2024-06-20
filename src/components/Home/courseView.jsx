import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCoursesContext } from '../../context/courses/courses.context';
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

const CourseView = () => {
    const { courseId } = useParams();
    const { getCourse } = useCoursesContext();
    const [course, setCourse] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);

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
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <div className="max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/5 pr-8">
                        {selectedContent ? (
                            <div className="mb-8">
                                {selectedContent.endsWith('.mp4') ? (
                                    <video controls className="w-full mb-4">
                                        <source src={selectedContent} type="video/mp4" />
                                        Tu navegador no soporta el elemento de video.
                                    </video>
                                ) : selectedContent.endsWith('.pdf') ? (
                                    <iframe
                                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(selectedContent)}`}
                                        className="w-full mb-4"
                                        style={{ minHeight: '600px' }}
                                        frameBorder="0"
                                    >
                                        Tu navegador no soporta PDFs. Por favor descarga el PDF para verlo: <a href={selectedContent}>Descargar PDF</a>
                                    </iframe>
                                ) : (
                                    <img src={selectedContent} alt="Vista previa del contenido" className="w-full mb-4" />
                                )}
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                                <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                                <p className="text-lg mb-4">{course.description}</p>
                            </>
                        )}
                    </div>
                    <div className="md:w-2/5">
                        <Collapse accordion>
                            {course.content && course.content.map((url, index) => (
                                <Panel header={`Recurso ${index + 1}`} key={index}>
                                    <Button type="link" onClick={() => handleContentClick(url)}>
                                        {url.endsWith('.mp4') ? 'Video' : url.endsWith('.pdf') ? 'PDF' : 'Imagen'}
                                    </Button>
                                </Panel>
                            ))}
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseView;
