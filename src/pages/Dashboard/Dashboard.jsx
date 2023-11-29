import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/loggedInUserContext";
import roles from "../../../config/roles";
import { Typography } from "@mui/material";
import ActiveOrdersTable from "../../components/ActiveOrdersTable/ActiveOrdersTable";
import TextField from "@mui/material/TextField";
import api from "../../../config/axios.config";
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'; 
import { useRef } from "react";
import { useState } from "react";
import checkIfJwtExpired from "../../../utils/checkIfJwtExpired";

export default function Dashboard() {
    const {
        isLoggedIn,
        loggedInUser,
        setIsLoggedIn,
        setLoggedInUser,
        errorCheckingLogin
    } = useContext(LoggedInUserContext);

    const formRef = useRef(null); 
    const [foundUser, setFoundUser] = useState({});

    const navigate = useNavigate();

    if (!isLoggedIn || !loggedInUser || loggedInUser.role == roles.Customer) {
        navigate("/"); 
        return <></>
    }

    function getUserByPhoneNumber(phone) {

        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) return alert("Please log in");
        if (checkIfJwtExpired(accessToken)) return alert("Please log in again"); 
    
        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }

        api.get(`/users/${phone}?byPhone=true`, config)
            .then(response => {
                console.log("SuccesResp"); 
                console.log(response); 

                setFoundUser(response.data.user); 
            })
            .catch(({response}) => {
                console.log("FailureResp"); 
                console.log(response); 
                const error = response?.data?.error;
                let message = response?.data?.message;

                console.log(error);
                if (error == 'jwt expired') message = "Please login again";
                alert(message);
            })
    }
    
    function handleFormSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const data = (Object.fromEntries(formData));

        console.log({data}); 

        getUserByPhoneNumber(data.phone); 

    }
    const isAdmin = loggedInUser.role == roles.Admin;

    return (
        <>
            <Typography>
                { JSON.stringify(loggedInUser) }
            </Typography>

            <Typography variant='h3' textTransform='uppercase' fontWeight='bold'>Active Orders</Typography>

            <ActiveOrdersTable></ActiveOrdersTable>

            { isAdmin && 
                <>
                    <Typography variant='h3' textTransform='uppercase' fontWeight='bold'>Manage Users</Typography>

                    <Box 
                        component="form" 
                        ref={formRef} 
                        onSubmit={handleFormSubmit}
                    >
                        <TextField name="phone" label="Enter phone no."></TextField>

                        <Button type="submit" variant="contained">Find User</Button>
                    </Box>
                    {
                        foundUser && JSON.stringify(foundUser) 
                    }
                </>
            }
        </>
    );
}