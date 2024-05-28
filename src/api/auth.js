import axios from 'axios'
const api = 'http://localhost:3068/PE'
export const registerRequest = user => axios.post(`${api}/register`, user)
export const loginRequest = user => axios.post(`${api}/login`, user)
export const resetPasswordRequest = user => axios.post(`${api}/reset-password`, user)
export const resetPasswordVerify = user => axios.post(`${api}/verify`, user)
export const passwordReset = user => axios.post(`${api}/passwordReset`, user)
export const logoutRequest = user => axios.post(`${api}/logout`, user)



