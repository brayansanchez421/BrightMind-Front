import axios from 'axios';

const api = 'http://localhost:3068/PE'; 

export const createCategory = (categoryData) => axios.post(`${api}/category/createCategory`, categoryData);