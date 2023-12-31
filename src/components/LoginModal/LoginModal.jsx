import React from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
// import axios from 'axios';
import { useState, useRef } from 'react';
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import storeAccessTokenInLocalStorage from '../../../utils/storeAccessTokenInLocalStorage';
import api from '../../../config/axios.config'
import checkIfLoggedIn from '../../../utils/checkIfLoggedIn';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import sampleUsers from '../../../config/sampleUsers.js';
import ROLES from '../../../config/roles.js';
import DialogContent from '@mui/material/DialogContent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const apiURL = import.meta.env.VITE_API_URL;


export default function LoginModal({ loginModalOpen, handleClose, setLoginModalOpen, onLogin }) {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const formRef = useRef(null);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [accountToLoginAs, setAccountToLoginAs] = useState(null);
    const [sampleAccountsInfoDialogOpen, setSampleAccountsInfoDialogOpen] = useState(false);

    function toggleForms() {
        setCreatingAccount(!creatingAccount);
        resetForm();
    }
    function handleSuccesfulLogin(data) {
        resetForm();
        setShowSuccessMsg(true);
        setTimeout(() => {
            setLoginModalOpen(false);
            showSuccessMsg(false);
        }, 1000)


        const accessToken = data.accessToken;
        storeAccessTokenInLocalStorage(accessToken);

        checkIfLoggedIn().then(response => {
            // console.log(response);
            onLogin(response.isLoggedIn, response.user);
        }).catch(err => {
            console.log("Catching error: ");
            console.log(err);
            onLogin(false, null);
        })

    }

    function handleLogin({ phone, password }) {
        console.log("handleLogin");
        console.log(apiURL);

        api.post(`/login`, { phone, password }).then(response => {
            console.log(response);
            const data = response.data;
            console.log("Successful login");
            handleSuccesfulLogin(data);
        }).catch((error) => {
            if (error.name == 'AxiosError') {
                const errorMsg = error?.response?.data?.error || error.message;
                setErrorFromAPI(errorMsg);
            } else {
                console.log({ error });
                window.alert("An error occurred. Please reload");
            }
        })
    }
    function resetForm() {
        const form = formRef.current;
        form.reset();
        setErrorFromAPI(null);
        setShowSuccessMsg(false);
    }

    function handleRegister({firstName, lastName, email, phone, password, role}) {
        const data = {firstName, lastName, email, phone, password, role}

        api.post(`/register`, data).then(response => {
            console.log(response);
            const data = response.data;
            console.log(data);
            console.log("Successful registration");
            alert("Account created successfully");
        }).catch((error) => {
            if (error.name == 'AxiosError') {
                const errorMsg = error?.response?.data?.error || error.message;
                setErrorFromAPI(errorMsg);
            } else {
                console.log({ error });
                window.alert("An error occurred. Please reload.");
            }
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = (Object.fromEntries(formData));

        if (creatingAccount) {
            handleRegister(data);
        } else {
            handleLogin(data);
        }
    }

    function loginAs(role) {
        const key = Object.keys(sampleUsers).find(key => sampleUsers[key].role == role);
        setAccountToLoginAs(sampleUsers[key]);
        setSampleAccountsInfoDialogOpen(true)
    }


    return (
        <>
            <Modal
                open={loginModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    showSuccessMsg ?
                        (
                            <Box sx={style}>
                                <Alert severity="success">Login Successful</Alert>
                            </Box>
                        ) :
                        (
                            <Box sx={style}>
                                {/* Form Heading */}
                                <Typography id="modal-modal-title" variant="h4" mb={5}>{
                                    creatingAccount ? 'Create Account' : 'Login'
                                }</Typography>

                                {/* Form */}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                                    component="form"
                                    onSubmit={handleFormSubmit}
                                    ref={formRef}
                                >

                                    <TextField id="outlined-basic" required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Phone" variant="outlined" name="phone" />
                                    {
                                        creatingAccount && <>
                                            <TextField id="outlined-basic" required label="First name" variant="outlined" name="firstName" />
                                            <TextField id="outlined-basic" label="Last name" variant="outlined" name="lastName" />
                                            <TextField id="outlined-basic" label="Email" variant="outlined" name="email" />
                                        </>
                                    }
                                    <TextField required id="outlined-basic" label="Password" variant="outlined" type="password" name="password" />
                                    {
                                        creatingAccount && <TextField required id="outlined-basic" label="Confirm password" variant="outlined" type="password" name="confirmPassword" />

                                    }

                                    {/* Form Validation Errors from API */}
                                    {
                                        errorFromAPI && (
                                            <Box>
                                                <Alert severity="error">{errorFromAPI}</Alert>
                                            </Box>
                                        )

                                    }


                                    <Box sx={{ display: 'flex', mt: 3, justifyContent: 'space-around', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-around' }}>

                                            <Button variant='contained' type='submit'>{
                                                creatingAccount ? 'Create' : 'Login'
                                            }</Button>

                                            <Button
                                                variant='outline' onClick={toggleForms}>{creatingAccount ? 'Log in' : 'Create an account'}</Button>
                                        </Box>

                                            <Box>

                                        <Typography id="modal-modal-title" variant="h6" mt={5} mb={2}>
                                            Login As:
                                        </Typography>
                                        
                                        <Button variant='outline' onClick={() => loginAs(ROLES.Admin)}>{ROLES.Admin}</Button>

                                        <Button variant='outline' onClick={() => loginAs(ROLES.Manager)}>{ROLES.Manager}</Button>

                                        <Button variant='outline' onClick={() => loginAs(ROLES.Employee)}>{ROLES.Employee}</Button>

                                        <Button variant='outline' onClick={() => loginAs(ROLES.Customer)}>{ROLES.Customer}</Button>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        )



                }
            </Modal>
            <Dialog
                open={sampleAccountsInfoDialogOpen}
                onClose={() => setSampleAccountsInfoDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography fontWeight="bold">Phone</Typography>
                        <Typography>{accountToLoginAs?.phone}</Typography>
                    </Box>

                    <Box>
                        <Typography fontWeight="bold">Password</Typography>
                        <Typography>{accountToLoginAs?.password}</Typography>
                    </Box>

                </DialogContent>
            </Dialog>

        </>

    )
}
