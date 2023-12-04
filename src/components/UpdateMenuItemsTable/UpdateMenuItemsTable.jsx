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

export default function UpdateMenuItemsTable() {

    const { allMenuItems } = useContext(MenuItemsContext);
    console.log({ allMenuItems });


    return (
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
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                <img width="50" src={item.img}></img>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}