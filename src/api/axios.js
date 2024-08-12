import axios from "axios";

const instance = axios.create({
    baseURL: 'https://plataformabrightmind.netlify.app/PE',
    withCredentials: true
})

export default instance