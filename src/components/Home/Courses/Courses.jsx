import React from 'react';
import HoverCard from '../HoverCard';
import NavigationBar from '../NavigationBar';
import { useLocation } from 'react-router-dom';
import { useCoursesContext } from '../../../context/courses/courses.context';

const Course = () => {
    const location = useLocation();
    const { title } = location.state || { title: '' };
    const { courses } = useCoursesContext();

    const filteredCourses = courses.filter(course => course.category === title);

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
        </div>
    );
};

export default Course;
