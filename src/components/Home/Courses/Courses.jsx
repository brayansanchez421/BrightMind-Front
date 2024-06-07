import React, { useState } from 'react';
import HoverCard from '../HoverCard';
import NavigationBar from '../NavigationBar';
import { useLocation } from 'react-router-dom';
import { useCoursesContext } from '../../../context/courses/courses.context';
import CardHome from '../Cards/CardHome';

const Course = () => {
    const location = useLocation();
    const { title } = location.state || { title: '' };
    const { courses } = useCoursesContext();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const filteredCourses = courses.filter(course => course.category === title);

    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handleRegister = () => {
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen overflow-hidden">
            <NavigationBar />
            <div className="flex justify-center mt-8">
                <h1 className="text-4xl font-bold text-white">Cursos de {title}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:mt-24 max-w-screen-xl mx-auto">
                {filteredCourses.map((course, index) => (
                    <CardHome 
                        key={index} 
                        title={course.title} 
                        description={course.description} 
                        ruta={course.image} 
                        onClick={() => handleCardClick(course)}
                    />
                ))}
            </div>
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Confirmar Registro</h2>
                        <p className="mb-4">¿Deseas confirmar el registro del curso <strong>{selectedCourse?.title}</strong>?</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition-colors"
                                onClick={handleRegister}
                            >
                                Registrar
                            </button>
                            <button 
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition-colors"
                                onClick={closeConfirmModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Registro Exitoso</h2>
                        <p className="mb-4">¡Te has registrado con éxito en el curso!</p>
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition-colors"
                            onClick={closeSuccessModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Course;
