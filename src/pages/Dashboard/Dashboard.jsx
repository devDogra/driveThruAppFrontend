import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/loggedInUserContext";
import roles from "../../../config/roles";


export default function Dashboard() {
    const {
        isLoggedIn,
        loggedInUser,
        setIsLoggedIn,
        setLoggedInUser,
        errorCheckingLogin
    } = useContext(LoggedInUserContext);

    const navigate = useNavigate();

    if (!isLoggedIn || !loggedInUser || loggedInUser.role == roles.Customer) {
        navigate("/"); 
        return <></>
    }

    if (loggedInUser.role == roles.Employee) {
        return (
            <>
                Employee Dashboard
            </>
        )
    }

    if (loggedInUser.role == roles.Manager) {
        return (
            <>
                Manager Dashboard
            </>
        )
    }


    return (
        <>
            { JSON.stringify(loggedInUser) }
        </>
    );
}