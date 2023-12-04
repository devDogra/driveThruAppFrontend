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
import InputLabel from '@mui/material/InputLabel';
import SelectItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UpdateMenuItemsTable from "../../components/UpdateMenuItemsTable/UpdateMenuItemsTable";

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
    const [selectedRole, setSelectedRole] = useState("Customer");

    const navigate = useNavigate();

    if (!isLoggedIn || !loggedInUser || loggedInUser.role == roles.Customer) {
        navigate("/");
        return <></>
    }

    function getUserByPhoneNumber(phone) {
        if (phone.length !== 10) return alert("Invalid phone number");
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) return alert("Please log in");
        if (checkIfJwtExpired(accessToken)) {
            alert("Please log in again");
            window.location.reload();
            return;
        }

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
                // Important not to use foundUser.role (setState is async)
                setSelectedRole(response.data.user.role);
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
    function handleRoleSelect(event) {
        const role = event.target.value;

        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) return alert("Please log in");
        if (checkIfJwtExpired(accessToken)) {
            alert("Please log in again");
            window.location.reload();
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        console.log({ foundUser, role, selectedRole });
        api.put(`/users/${foundUser._id}`, { role }, config)
            .then(response => {
                setSelectedRole(role)
                setFoundUser({ ...foundUser, role });
                alert("Role updated");
            })
            .catch(({ response }) => {
                const error = response?.data?.error;
                let message = response?.data?.message;
                if (error) console.log(error);
                if (error == 'jwt expired') message = "Please login again";
                alert(message || error);
            })
    }

    const isAdmin = loggedInUser.role == roles.Admin;
    const isManager = loggedInUser.role == roles.Manager;

    return (
        <>
            <Typography>
                {JSON.stringify(loggedInUser)}
            </Typography>

            <Typography variant='h3' textTransform='uppercase' fontWeight='bold' mb={4}>Active Orders</Typography>

            <ActiveOrdersTable></ActiveOrdersTable>

            {(isManager || isAdmin) && <>
                <Typography variant='h3' textTransform='uppercase' fontWeight='bold' mt={8} mb={4}>Manage Menu</Typography>

                <UpdateMenuItemsTable></UpdateMenuItemsTable>
            </>}

            {isAdmin &&
                <>
                    <Typography variant='h3' textTransform='uppercase' fontWeight='bold' mt={8}>Manage Users</Typography>

                    {/* Find user by phone form */}
                    <Box
                        component="form"
                        ref={formRef}
                        onSubmit={handleFormSubmit}
                        sx={{ display: "flex", alignItems: "stretch", mt: 4, gap: 2 }}
                    >
                        <TextField name="phone" label="Enter phone no."></TextField>

                        <Button type="submit" variant="contained">Find User</Button>
                    </Box>

                    {/* Found user card */}
                    {foundUser && <Paper sx={{ display: 'flex', gap: "1rem", p: 4, flexShrink: 1, py: 6, borderRadius: 4, mt: 4 }} profile-card>
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
                        <Box sx={{ alignSelf: 'center', display: 'flex', gap: 2, marginLeft: 4 }}>
                            {/* <Button variant="contained" color="error" sx={{alignSelf: 'center'}}>Demote role</Button>
                            <Button variant="contained" color="primary" sx={{alignSelf: 'center'}}>Elevate role</Button> */}
                            {foundUser.role !== "Admin" &&
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedRole}
                                        label="Role"
                                        onChange={handleRoleSelect}
                                    >
                                        <SelectItem value={"Customer"}>Customer</SelectItem>
                                        <SelectItem value={"Employee"}>Employee</SelectItem>
                                        <SelectItem value={"Admin"}>Admin</SelectItem>
                                    </Select>
                                </FormControl>
                            }

                        </Box>


                    </Paper>
                    }




                </>
            }
        </>
    );
}