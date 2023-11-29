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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Paper from '@mui/material/Paper'

export default function Dashboard() {
    const {
        isLoggedIn,
        loggedInUser,
        setIsLoggedIn,
        setLoggedInUser,
        errorCheckingLogin
    } = useContext(LoggedInUserContext);

    const formRef = useRef(null);
    const [foundUser, setFoundUser] = useState(null);

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
            .catch(({ response }) => {
                console.log("FailureResp");
                console.log(response);
                const error = response?.data?.error;
                let message = response?.data?.message;

                console.log(error);
                if (error == 'jwt expired') message = "Please login again";
                alert(message || error);
            })
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = (Object.fromEntries(formData));

        console.log({ data });

        getUserByPhoneNumber(data.phone);

    }
    const isAdmin = loggedInUser.role == roles.Admin;

    return (
        <>
            <Typography>
                {JSON.stringify(loggedInUser)}
            </Typography>

            <Typography variant='h3' textTransform='uppercase' fontWeight='bold' mb={4}>Active Orders</Typography>

            <ActiveOrdersTable></ActiveOrdersTable>

            {isAdmin &&
                <>
                    <Typography variant='h3' textTransform='uppercase' fontWeight='bold' mt={8}>Manage Users</Typography>

                    {/* Find user by phone form */}
                    <Box
                        component="form"
                        ref={formRef}
                        onSubmit={handleFormSubmit}
                        sx={{display: "flex", alignItems:"stretch", mt:4, gap: 2}}
                    >
                        <TextField name="phone" label="Enter phone no."></TextField>

                        <Button type="submit" variant="contained">Find User</Button>
                    </Box>
               
                    {/* Found user card */}
                    {foundUser && <Paper sx={{ display: 'flex', gap: "1rem", p: 4, flexShrink: 1, py: 6, borderRadius: 4, mt:4 }} profile-card>
                        <AccountBoxIcon sx={{ fontSize: "6rem", alignSelf: 'center' }}></AccountBoxIcon>
                        <Box>
                            <Typography variant='h6' textTransform='uppercase' mb={1} fontWeight='bold'>
                                {foundUser?.firstName}
                            </Typography>

                            <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                                <PhoneAndroidIcon></PhoneAndroidIcon>
                                <Typography variant='p' fontWeight='bold' >
                                    {foundUser?.phone}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                                <BadgeIcon></BadgeIcon>
                                <Typography variant='p' fontWeight='bold' >
                                    {foundUser?.role}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{alignSelf:'center', display:'flex', gap:2, marginLeft:4}}>
                            <Button variant="contained" color="error" sx={{alignSelf: 'center'}}>Demote role</Button>
                            <Button variant="contained" color="primary" sx={{alignSelf: 'center'}}>Elevate role</Button>
                        </Box>
                        
                        
                    </Paper>
               
                    }
                

                </>
            }
        </>
    );
}