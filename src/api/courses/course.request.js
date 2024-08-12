import axios from 'axios';

const api = 'https://plataformabrightmind.netlify.app/PE/courses/'; 

const courseRequest = axios.create({
  baseURL: api,
  withCredentials: true,
});

// Función para obtener todos los cursos
export const getAllCourses = () => courseRequest.get('/getAllCourses');

// Función para asignar contenido a un curso
export const asignarContenido = (id, contentFile) => {
  const formData = new FormData(); // Crear una instancia de FormData

  // Agregar el archivo de contenido al FormData
  formData.append('content', contentFile);

  // Realizar la solicitud POST utilizando Axios
  return courseRequest.post(`/asignarContenido/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Función para eliminar un recurso de un curso
export const deleteResource = (courseId, resourceIndex) => {
  return courseRequest.delete(`/courses/${courseId}/resources/${resourceIndex}`);
};


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
