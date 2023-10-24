import { useEffect, useState } from "react";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";

export default function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorCheckingLoggedIn, setErrorCheckingLoggedIn] = useState(null);

    useEffect(() => {
        checkIfLoggedIn().then(result => {
            setIsLoggedIn(result.isLoggedIn);
            setLoggedInUser(result.loggedInUser || null);
        }).catch(error => setErrorCheckingLoggedIn(error));
    })

    return {isLoggedIn, loggedInUser, error: errorCheckingLoggedIn};
}