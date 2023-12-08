import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import checkIfJwtExpired from '../../../utils/checkIfJwtExpired';
import { MenuItemsContext } from '../../contexts/menuItemsContext';
import { useContext } from 'react';
import api from '../../../config/axios.config';

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
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

export default function AddMenuItemModal({ addMenuItemModalOpen, setAddMenuItemModalOpen, handleAddMenuItemModalClose }) {
    const { allMenuItems, setAllMenuItems } = useContext(MenuItemsContext);

    // const formRef = useRef(null);

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { menuItemImage, ...data } = (Object.fromEntries(formData));
        data.itemNumber = 1 + Math.max(...allMenuItems.map(item => item.itemNumber));

        console.log({ data, menuItemImage });
        // return;

        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) return alert("Please log in");
        if (checkIfJwtExpired(accessToken)) {
            alert("Please log in again");
            window.location.reload();
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        }

        const configImageData = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }

        // Post Menu Item Image
        const imgFormData = new FormData();
        imgFormData.append('menuItemImage', menuItemImage);
        imgFormData.append('saveAsName', data.name);
        
        api.post('/uploadImage', imgFormData, configImageData).then((response) => {
            //handle success
            console.log("img succ");
            console.log(response);
        }).catch((error) => {
            console.log("img error");
            console.log(error);
            //handle error
        })

        // Post Menu Item Data
        const img = `${api.defaults.baseURL}/static/menuItems/${data.name}.webp`
        data.img = img;
        api.post('/menuItems', data, config).then(response => {
            console.log("succress response");
            console.log(response);
        }).catch(errorResponse => {
            console.log(errorResponse);
        })
    }

    return (
        <>
            <Modal
                open={addMenuItemModalOpen}
                onClose={handleAddMenuItemModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}
                    component="form"
                    onSubmit={handleFormSubmit}
                >
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Image
                        <input type="file" hidden name="menuItemImage" />
                    </Button>

                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" />

                    <TextField id="outlined-basic" required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Price" variant="outlined" name="price" />

                    <TextField id="outlined-basic" required label="Description" variant="outlined" name="description" />

                    <Button type="submit" variant="contained">Submit</Button>
                </Box>

            </Modal>
        </>
    );
}
