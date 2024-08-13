import axios from "axios";

const instance = axios.create({
    baseURL: 'https://brightmind-back.onrender.com/PE',
    withCredentials: true
})

export default instance