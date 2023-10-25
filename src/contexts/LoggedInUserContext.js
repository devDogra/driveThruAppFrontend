import { createContext } from "react";

const defaultContext = { 
    isLoggedIn: false, 
    loggedInUser: null,
    setIsLoggedIn: () => {},
    setLoggedInUser: () => {},
    error: null,
} 

export const LoggedInUserContext = createContext(defaultContext);

