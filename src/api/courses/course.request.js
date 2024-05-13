import axios from 'axios';
const api = 'http://localhost:3068/PE'; 

const courseRequest = axios.create({
  baseURL: api,
  withCredentials: true,
});

export const getAllCourses = () => courseRequest.get('/getAllCourses');
export const getCourse = (id) => courseRequest.get(`/getCourse/${id}`);
export const createCourse = (courseData) => courseRequest.post('/createCourse', courseData);
export const updateCourse = (id, courseData) => courseRequest.put(`/updateCourse/${id}`, courseData);
export const deleteCourse = (id) => courseRequest.delete(`/deleteCourse/${id}`);

export default courseRequest;