import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/loggedInUserContext";
import roles from "../../../config/roles";
import { Typography } from "@mui/material";
import ActiveOrdersTable from "../../components/ActiveOrdersTable/ActiveOrdersTable";


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

    // if (loggedInUser.role == roles.Employee) {
    //     return (
    //         <>
    //             Employee Dashboard
    //         </>
    //     )
    // }
    // if (loggedInUser.role == roles.Manager) {
    //     return (
    //         <>
    //             Manager Dashboard
    //         </>
    //     )
    // }

    const isManager = loggedInUser.role == roles.Manager;

    return (
        <>
            <Typography>
                { JSON.stringify(loggedInUser) }
            </Typography>

            <Typography variant='h3' textTransform='uppercase' fontWeight='bold'>Active Orders</Typography>

            <ActiveOrdersTable></ActiveOrdersTable>

            { isManager && 
                <>
                    <Typography variant='h3' textTransform='uppercase' fontWeight='bold'>Manage Users</Typography>
                </>
            }
        </>
    );
}