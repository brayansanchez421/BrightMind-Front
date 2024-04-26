import axios from 'axios'
const api = 'http://localhost:3068/PE'

export const getAllUsers = () => axios.get(`${api}/users/getAll`,{withCredentials: true})
export const getUser = (_id) => axios.get(`${api}/users/get/${_id}`,{withCredentials: true});
export const updateUser = (_id, userData) => axios.put(`${api}/users/modify/${_id}`, userData,{withCredentials: true});
export const ActivateAcc = (_id) => axios.get(`${api}/activation/${_id}`,{withCredentials: true})

export const deleteUser = (id) => axios.delete(`${api}/users/delete/${id}`,{withCredentials: true});

export const deleteUserConfirmation = (id, confirmationCode) => axios.delete(`${api}/users/delete/${id}/confirm`, { data: { confirmationCode } },{withCredentials: true});
