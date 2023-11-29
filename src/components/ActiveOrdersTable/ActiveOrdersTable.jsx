import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip'
import { blueGrey } from '@mui/material/colors';
import { nanoid } from 'nanoid';
import useFetchApi from '../../../hooks/useFetchApi';
import { useEffect, useState } from 'react';
import api from '../../../config/axios.config';
import { jwtDecode } from "jwt-decode";
import { format } from 'date-fns';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box'; 
import checkIfJwtExpired from '../../../utils/checkIfJwtExpired';

function getOrderStringAndPrice(order) {
    let totalPrice = 0;
 
    let orderString = order.items
        .map(orderItem => {
            const { name, price } = orderItem.menuItemId;
            const quantity = orderItem.quantity;
            const result = `${name} x ${quantity}`
            totalPrice += price; 
            return result;
        })
        .join(", ");
    

    const TRIM_LENGTH = 75;
    let trimmedOrderString = orderString.length > 75 
            ? orderString.substring(0, TRIM_LENGTH+1 - 3) + "..." 
            : null

    return [orderString, totalPrice, trimmedOrderString]; 
}

export default function ActiveOrdersTable() {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken'); 

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    
    // Get all currently pending orders
    api.get(`/orders?populateMenuItems=true`, config).then(response => {
      const { orders, success } = response.data; 
      console.log({orders}); 
      setPendingOrders(orders.filter(o => o.state == 'Pending')); 
    })

  }, [])

  function setOrderState(order, state) {
    // Pending, Delivered, Cancelled
    console.log({order, state}); 
    const updateData = {
        state 
    }
    const accessToken = window.localStorage.getItem('accessToken');
    if (!accessToken) {
      return alert("Please log in");
    }
    if (checkIfJwtExpired(accessToken)) {
      return alert("Please log in again"); 
    }

    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
    api.put(`/orders/${order._id}`, updateData, config)
        .then(response => {
            console.log("SuccesResp"); 
            console.log(response); 
            const { success, error, message: errorMessage } = response.data;
            alert(success);
            setPendingOrders(pendingOrders.filter(o => o._id != order._id))
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

  return (
    <TableContainer component={Paper} sx={{maxHeight: 300}}>
      <Table stickyHeader sx={{ minWidth: 650, "& .MuiTableRow-root:hover": {
      backgroundColor: blueGrey[50],
    
    } }} aria-label="a sparse table" >
        <TableHead >
          <TableRow hover>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Pending Orders ({ pendingOrders.length })</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Made on</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Price</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase"></Typography>
            </TableCell>

    

          </TableRow>
        </TableHead>
        <TableBody>
          {pendingOrders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, hover: {
                bgcolor:'red'
              } }}
            >
                {
                    (() => {
                        const [orderString, totalPrice, trimmedOrderString] = getOrderStringAndPrice(order);
                        return (
                            <>
                                <Tooltip title={trimmedOrderString && orderString}>
                                    <TableCell component="th" scope="row">{trimmedOrderString || orderString}</TableCell>
                                </Tooltip>

                                <TableCell>
                                  {format(new Date(order.createdAt),"dd MMM yyyy, 'at' HH:mm" )}
                                </TableCell>

                                
                                <TableCell>{totalPrice}</TableCell>

                                <TableCell>
                                    <Box sx={{ display:'flex', gap:2, justifyContent:'end'}}>
                                        <Button 
                                        variant="contained" color="success"
                                        onClick={() => setOrderState(order, 'Delivered')}
                                        >Deliver</Button>

                                        <Button 
                                        variant="contained" color="error"
                                        onClick={() => setOrderState(order, 'Cancelled')}
                                        >Cancel</Button>
                                    </Box>
                                </TableCell>
                           

                            </>
                        );
                    })()
                }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
