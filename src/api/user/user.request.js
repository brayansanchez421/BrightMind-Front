import axios from 'axios';
const api = 'http://localhost:3068/PE';

export const getAllUsers = () => axios.get(`${api}/users/getAll`, { withCredentials: true });

export const getUser = (_id) => axios.get(`${api}/users/get/${_id}`, { withCredentials: true });

export const updateUser = async (_id, userData) => {
    return axios.put(`${api}/users/modify/${_id}`, userData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};



export const ActivateAcc = (_id) => axios.get(`${api}/activation/${_id}`, { withCredentials: true });

export const deleteUser = (id) => axios.delete(`${api}/users/delete/${id}`, { withCredentials: true });

export const deleteUserConfirmation = (id, confirmationCode) => axios.delete(`${api}/users/delete/${id}/confirm`, { data: { confirmationCode }, withCredentials: true });

export const createUser = (userData) => axios.post(`${api}/users/createUser`, userData, { withCredentials: true });
