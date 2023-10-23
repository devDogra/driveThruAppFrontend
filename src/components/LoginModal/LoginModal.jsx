import React from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { useState } from 'react';

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

export default function LoginModal({ loginModalOpen, handleClose }) {
    const [creatingAccount, setCreatingAccount] = useState(false);


    return (
        <Modal
            open={loginModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" mb={5}>{
                    creatingAccount ? 'Create Account' : 'Login'
                }</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                    component="form">

                    <TextField id="outlined-basic" required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Phone" variant="outlined" />
                    {
                        creatingAccount && <>
                        <TextField id="outlined-basic" required label="First name" variant="outlined" />
                        <TextField id="outlined-basic" label="Last name" variant="outlined" />
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        </>
                    }
                    <TextField required id="outlined-basic" label="Password" variant="outlined" type="password"/>
                    {
                        creatingAccount &&  <TextField required id="outlined-basic" label="Confirm password" variant="outlined" type="password"/>

                    }



                    <Box sx={{ display: 'flex', mt: 3, justifyContent: 'space-around' }}>
                        <Button variant='contained'>{
                            creatingAccount ? 'Create' : 'Login'
                        }</Button>
                        <Button variant='outline' onClick={() => setCreatingAccount(!creatingAccount)}>{ creatingAccount ? 'Log in' : 'Create an account' }</Button>
                    </Box>
                </Box>
            </Box>

        </Modal>
    )
}
