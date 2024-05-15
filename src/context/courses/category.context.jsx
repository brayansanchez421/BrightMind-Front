import React, { useState, createContext, useContext } from 'react';
import { createCategory } from '../../api/courses/category.request'; // Importa la función createCategory de tu archivo api/category.request.js

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

    const createCategory = async (categoryData) => {
        try {
            console.log("categoryData:", categoryData);

            const { data } = await createCategory(categoryData);
            setCategories([...categories, data]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, createCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
