import React from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
// import axios from 'axios';
import { useState, useRef } from 'react';
import Alert from '@mui/material/Alert'
import storeAccessTokenInLocalStorage from '../../../utils/storeAccessTokenInLocalStorage';
import api from '../../../config/axios.config'
import checkIfLoggedIn from '../../../utils/checkIfLoggedIn';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import { useContext } from 'react';
import { YourOrderContext } from '../../contexts/yourOrderContext';
import YourOrderTable from '../YourOrderTable/YourOrderTable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: 300,
    // overflow: "auto",
    // p: 4,

};

const apiURL = import.meta.env.VITE_API_URL; 


export default function YourOrderTableModal() {
    const { 
        yourOrder,
        setYourOrder, 
        yourOrderTableModalOpen, 
        setYourOrderTableModalOpen 
    } = useContext(YourOrderContext)

    function handleClose() {
        console.log("Closing YourOrderTableModal"); 
        setYourOrderTableModalOpen(false); 
    }

    return (
        <>
            <Modal
                open={yourOrderTableModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
               <YourOrderTable modalStyle={style}></YourOrderTable>
            </Modal>
   
        </>

    )
}
