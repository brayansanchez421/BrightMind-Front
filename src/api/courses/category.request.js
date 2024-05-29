import axios from 'axios';

const api = 'http://localhost:3068/PE'; // Reemplaza la URL base con la correcta

// Función para crear una categoría
export const createCategory = (categoryData) => {
  const formData = new FormData(); // Crea una instancia de FormData

  // Agrega los datos de la categoría al FormData
  formData.append('name', categoryData.name);
  formData.append('description', categoryData.description);
  formData.append('image', categoryData.image); // Asegúrate de que la imagen se agregue al FormData con el nombre 'image'

  // Realiza la solicitud POST utilizando Axios
  return axios.post(`${api}/category/createCategory`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCategories = () => axios.get(`${api}/category/getCategories`, { withCredentials: true });
