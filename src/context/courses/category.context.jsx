import React, { useState, createContext, useContext, useEffect } from 'react';
import { createCategory as createCategoryApi, getCategories as getCategoriesApi } from '../../api/courses/category.request'; // Importa las funciones de tu archivo api

export const CategoryContext = createContext();

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategoryContext debe ser usado dentro de CategoryProvider");
    }
    return context;
};

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const createCategory = async (data) => {
        try {
            const res = await createCategoryApi(data);
            setCategories([...categories, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getCategories = async () => {
        try {
            const res = await getCategoriesApi();
            setCategories(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, createCategory, getCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};
