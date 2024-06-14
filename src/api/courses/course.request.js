import axios from 'axios';

const api = 'http://localhost:3068/PE/courses/'; 

const courseRequest = axios.create({
  baseURL: api,
  withCredentials: true,
});

// Función para obtener todos los cursos
export const getAllCourses = () => courseRequest.get('/getAllCourses');

// Función para obtener un curso por ID
export const getCourse = (id) => courseRequest.get(`/getCourse/${id}`);

// Función para crear un curso
export const createCourse = (courseData) => {
  const formData = new FormData(); // Crear una instancia de FormData

  // Agregar los datos del curso al FormData
  formData.append('title', courseData.title);
  formData.append('description', courseData.description);
  formData.append('category', courseData.category);

  // Agregar la imagen si existe
  if (courseData.image) {
    formData.append('image', courseData.image);
  }

  // Realizar la solicitud POST utilizando Axios
  return courseRequest.post('/createCourse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Función para actualizar un curso
export const updateCourse = (id, courseData) => {
  const formData = new FormData(); // Crear una instancia de FormData

  // Agregar los datos del curso al FormData
  formData.append('title', courseData.title);
  formData.append('description', courseData.description);
  formData.append('category', courseData.category);
  formData.append('content', courseData.content);

  // Agregar la imagen si existe
  if (courseData.image) {
    formData.append('image', courseData.image);
  }



  // Realizar la solicitud PUT utilizando Axios
  return courseRequest.put(`/updateCourse/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Función para eliminar un curso
export const deleteCourse = (id) => courseRequest.delete(`/deleteCourse/${id}`);
export const getCoursesByCategory = (categoryName) => courseRequest.get(`/category/${categoryName}`);

export default courseRequest;
