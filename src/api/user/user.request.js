import axios from 'axios'
const api = 'http://localhost:3068/PE'

export const getAllUsers = () => axios.get(`${api}/users/getAll`)
export const getUser = (_id) => axios.get(`${api}/users/get/${_id}`);
export const updateUser = (_id, userData) => axios.put(`${api}/users/modify/${_id}`, userData);
export const ActivateAcc = (_id) => axios.get(`${api}/activation/${_id}`)

export const deleteUser = (id) => axios.delete(`${api}/users/delete/${id}`);

export const deleteUserConfirmation = (id, confirmationCode) => axios.delete(`${api}/users/delete/${id}/confirm`, { data: { confirmationCode } });
