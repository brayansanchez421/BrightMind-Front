import axios from 'axios'
const api = 'https://plataformabrightmind.netlify.app/PE'

export const getAllPermissions = () => axios.get(`${api}/permissions/getPermissions`)


