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

export default function PreviousOrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken'); 
    const loggedInUserId = jwtDecode(accessToken).user;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    
    // Get all orders by the currently logged in user
    api.get(`/orders?userId=${loggedInUserId}&populateMenuItems=true`, config).then(response => {
      const { orders, success } = response.data; 
      console.log({orders}); 
      setOrders(orders);
    })

  }, [])

  return (
    <TableContainer component={Paper} sx={{maxHeight: 300}}>
      <Table stickyHeader sx={{ minWidth: 650, "& .MuiTableRow-root:hover": {
      backgroundColor: blueGrey[50],
    
    } }} aria-label="a sparse table" >
        <TableHead >
          <TableRow hover>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Items</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Made on</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Status</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}} align="right">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Price</Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
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

                                <TableCell>
                                  {order.state}
                                </TableCell>

                                <TableCell align="right">{totalPrice}</TableCell>
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
