import { jwtDecode } from "jwt-decode";

export default function (accessToken) {
    let decodedToken = jwtDecode(accessToken);
    console.log("Decoded Token", decodedToken);

    let currentDate = new Date();
    let expired = false; 
    
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        expired = true; 
    }

    return expired; 
}

