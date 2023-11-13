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

    // We don't consider the result of not being logged in, an error
    return api.get('/validate', config)
    .then(response => {
        console.log("Validation response receieved"); 
        console.log(response.data);
        return response.data
    })
    .catch(error => {
        if (error.response.data.message == 'Invalid access token') {
            // console.log(error.response.data);
            return Promise.resolve({
                isLoggedIn: false,
            })
        } else {
            // Something went wrong during the check
            console.log("Throwing error from checkIfLoggedIn"); 
            throw error;
        }
    });
}