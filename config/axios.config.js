import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL; 


const api = axios.create({
    baseURL: apiURL,
    withCredentials: true, // Without this Cookies we won't get cookies in response
    headers: {
        "Content-type": "application/json",
    },
});


export default api;