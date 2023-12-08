import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import api from '../../../config/axios.config';
import { useContext } from 'react';
import { MenuItemsContext } from '../../contexts/menuItemsContext';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import checkIfJwtExpired from '../../../utils/checkIfJwtExpired';
import AddMenuItemModal from '../AddMenuItemModal/AddMenuItemModal';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function UpdateMenuItemsTable() {

    const { allMenuItems, setAllMenuItems } = useContext(MenuItemsContext);
    const [addMenuItemModalOpen, setAddMenuItemModalOpen] = useState(false);
    console.log({ allMenuItems });

    const handleAddMenuItemModalClose = () => setAddMenuItemModalOpen(false);
    const handleAddMenuItemModalOpen = () => setAddMenuItemModalOpen(true);

    const [editingItem, setEditingItem] = useState(null);

    function handleEditingItemSave(event) {

        const edits = {
            name: editingItem.name,
            price: editingItem.price,
            description: editingItem.description,
        }

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

        api.put(`/menuItems/${editingItem._id}`, edits, config)
            .then(response => {
                setAllMenuItems(allMenuItems.map(item => item._id == editingItem._id ? editingItem : item))
                setEditingItem(null);
                alert("Menu Item Updated");

            })
            .catch(({ response }) => {
                const error = response?.data?.error;
                let message = response?.data?.message;
                if (error) console.log(error);
                if (error == 'jwt expired') message = "Please login again";
                alert(message || error);
            })

    }

    return (
        <>
            <Button
                onClick={handleAddMenuItemModalOpen}
                variant="contained"
                sx={{mb: 4}}
            >
                Add New Item
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Number</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Image</TableCell>
                            <TableCell >{/* Edit */}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allMenuItems.map((item) => (
                            <TableRow
                                key={item._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{item.itemNumber}</TableCell>

                                {editingItem?._id == item._id ?
                                    <>
                                        <TableCell component="th" scope="row">
                                            <TextField value={editingItem.name} onChange={(e) => {
                                                setEditingItem({ ...editingItem, name: e.target.value })
                                            }}></TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField value={editingItem.price} onChange={e => {
                                                setEditingItem({ ...editingItem, price: e.target.value })
                                            }}></TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField value={editingItem.description} onChange={e => {
                                                setEditingItem({ ...editingItem, description: e.target.value })
                                            }}></TextField>
                                        </TableCell>
                                    </> :
                                    <>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                    </>

                                }

                                <TableCell>
                                    <img width="50" src={item.img}></img>
                                </TableCell>
                                <TableCell>
                                    {editingItem?._id == item._id ?
                                        <IconButton aria-label="save" onClick={handleEditingItemSave}>
                                            <CheckCircleIcon />
                                        </IconButton>
                                        :
                                        <IconButton aria-label="edit" onClick={() => setEditingItem(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    }
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



            <AddMenuItemModal
                addMenuItemModalOpen={addMenuItemModalOpen}
                setAddMenuItemModalOpen={setAddMenuItemModalOpen}
                handleAddMenuItemModalClose={handleAddMenuItemModalClose}
            />
        </>

    );
}