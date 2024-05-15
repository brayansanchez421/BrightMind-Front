import React, { useState, createContext, useContext } from 'react';
import { createCategory as createCategoryApi } from '../../api/courses/category.request'; // Importa la función createCategory de tu archivo api/category.request.js

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
            console.log("categoryData:", data);

            const res = await createCategoryApi(data);
            setCategories([...categories, res.data]);
            return res.data;

        } catch (error) {
            console.error(error);
            return null;

        }
    };



    return (
        <CategoryContext.Provider value={{ categories, createCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
