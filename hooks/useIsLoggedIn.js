import { useEffect, useState } from "react";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";

export default function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorCheckingLoggedIn, setErrorCheckingLoggedIn] = useState(null);

    useEffect(() => {
        checkIfLoggedIn().then(result => {
            console.log({res: result}); 
            setIsLoggedIn(result.isLoggedIn);
            setLoggedInUser(result.user || null);
        }).catch(error => setErrorCheckingLoggedIn(error));
    }, [])

    return {isLoggedIn, loggedInUser, setIsLoggedIn, setLoggedInUser, errorCheckingLoggedIn};
}