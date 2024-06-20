import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HoverCard from '../Cards/HoverCard';
import NavigationBar from '../NavigationBar';
import { useCoursesContext } from '../../../context/courses/courses.context';
import { useUserContext } from '../../../context/user/user.context';
import { useAuth } from '../../../context/auth.context';

const Course = () => {
    const location = useLocation();
    const { title } = location.state || { title: '' };
    const { courses } = useCoursesContext();
    const { user } = useAuth();
    const { registerToCourse } = useUserContext();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [userCourses, setUserCourses] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (user && user.data) {
            console.log('User data:', user.data); // Debug: log user data
            if (user.data.courses) {
                setUserCourses(user.data.courses);
                console.log('User courses set in state:', user.data.courses); // Debug: log user courses
            }
        }
    }, [user]);

    useEffect(() => {
        if (selectedCourse) {
            console.log("este: ", userCourses)
            console.log("este1: ", selectedCourse._id)

            const isUserRegistered = userCourses.includes(selectedCourse._id);
            setIsRegistered(isUserRegistered);
            console.log(`Is user registered for ${selectedCourse.title}:`, isUserRegistered); // Debug: log registration status
        }
    }, [selectedCourse, userCourses]);

    const filteredCourses = courses.filter(course => course.category === title);
    console.log('Filtered courses:', filteredCourses); // Debug: log filtered courses

    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setIsConfirmModalOpen(true);
        console.log('Selected course:', course); // Debug: log selected course
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handleRegister = async () => {
        if (user && user.data && user.data.id) {
            try {
                await registerToCourse(user.data.id, selectedCourse._id);
                setIsConfirmModalOpen(false);
                setIsSuccessModalOpen(true);
                setUserCourses(prev => [...prev, selectedCourse._id]);  // Update local userCourses state
                console.log('User registered successfully:', selectedCourse._id); // Debug: log registration success
            } catch (error) {
                console.error('Error al registrar el curso:', error);
            }
        } else {
            console.error('Usuario no autenticado');
        }
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
                    <HoverCard
                        key={index}
                        title={course.title}
                        description={course.description}
                        ruta={course.image}
                        onClick={() => handleCardClick(course)}
                    />
                ))}
            </div>
            {isConfirmModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Confirmar Registro</h2>
                        {isRegistered ? (
                            <p className="mb-4">Ya te encuentras registrado en el curso <strong>{selectedCourse.title}</strong>.</p>
                        ) : (
                            <p className="mb-4">¿Deseas confirmar el registro del curso <strong>{selectedCourse.title}</strong>?</p>
                        )}
                        <div className="flex justify-end gap-4">
                            <button
                                className={`py-2 px-4 rounded transition-colors ${isRegistered ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 text-white'}`}
                                onClick={handleRegister}
                                disabled={isRegistered}
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
