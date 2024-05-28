import React, { useState, createContext, useContext, useEffect } from 'react';
import { getAllCourses as getAllCoursesApi, getCourse as getCourseApi, createCourse as createCourseApi, updateCourse as updateCourseApi, deleteCourse as deleteCourseApi } from '../../api/courses/course.request'; // Importa las funciones de tu archivo api

export const CoursesContext = createContext();

export const useCoursesContext = () => {
    const context = useContext(CoursesContext);
    if (!context) {
        throw new Error("useCoursesContext debe ser usado dentro de CoursesProvider");
    }
    return context;
};

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    const getAllCourses = async () => {
        try {
            const res = await getAllCoursesApi();
            setCourses(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getCourse = async (id) => {
        try {
            const res = await getCourseApi(id);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const createCourse = async (courseData) => {
        try {
            const formData = new FormData();
            Object.keys(courseData).forEach(key => {
                formData.append(key, courseData[key]);
            });

            const res = await createCourseApi(formData);
            setCourses([...courses, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const updateCourse = async (id, courseData) => {
        try {
            const { data: currentCourseData } = await getCourseApi(id);

            const updatedCourseData = {
                title: courseData.title || currentCourseData.title,
                description: courseData.description || currentCourseData.description,
                category: courseData.category || currentCourseData.category,
                image: courseData.image || currentCourseData.image, // Asegurarse de manejar la imagen
            };

            const formData = new FormData();
            Object.keys(updatedCourseData).forEach(key => {
                formData.append(key, updatedCourseData[key]);
            });

            const res = await updateCourseApi(id, formData);
            setCourses(courses.map(course => (course.id === id ? res.data : course)));
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const deleteCourse = async (id) => {
        try {
            await deleteCourseApi(id);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <CoursesContext.Provider value={{ courses, getAllCourses, getCourse, createCourse, updateCourse, deleteCourse }}>
            {children}
        </CoursesContext.Provider>
    );
};