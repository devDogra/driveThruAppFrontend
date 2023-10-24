import api from '../config/axios.config.js';

// Returns a Promise, which resolves to an object with an isLoggedIn boolean property. If value = true, then also returns the logged in user
export default function checkIfLoggedIn() {
    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
        return Promise.resolve({
            isLoggedIn: false,
        })
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    return api.get('/validate', config);
}