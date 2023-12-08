import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3500'; 


const api = axios.create({
    baseURL: apiURL,
    withCredentials: true, // Without this Cookies we won't get cookies in response
    headers: {
        "Content-type": "application/json",
    },
});


export default api;