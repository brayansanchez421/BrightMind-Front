import axios from 'axios';

const api = 'http://localhost:3068/PE'; // Reemplaza la URL base con la correcta

export const createCategory = (categoryData) => axios.post(`${api}/category/createCategory`, categoryData);
