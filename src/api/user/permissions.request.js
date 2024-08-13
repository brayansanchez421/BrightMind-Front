import axios from 'axios'
const api = 'https://brightmind-back.onrender.com/PE'

export const getAllPermissions = () => axios.get(`${api}/permissions/getPermissions`)


