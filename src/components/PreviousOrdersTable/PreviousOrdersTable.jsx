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
import { useEffect } from 'react';
import api from '../../../config/axios.config';
import { jwtDecode } from "jwt-decode";


function getOrderItem(name, price, quantity) {
  return {
    item: {
      name, 
      price,
    },
    quantity,
  }

}

function getOrder(big) {
    const order = {
        items: [
            getOrderItem('Burger', 200, 2),
            getOrderItem('Coke (Large)', 70, 2),
            getOrderItem('Fries', 120, 1),
            getOrderItem('Fries', 120, 1),
        ],
        id: nanoid(),
    }
    if (big) {
        order.items = [...order.items, ...order.items, ...order.items]
    }
    return order; 
}

const orders = [
    getOrder(),
    getOrder(true),
    getOrder(),
]

console.log({orders}); 

function getOrderStringAndPrice(order) {
    let totalPrice = 0;

    let orderString = order.items
        .map(orderItem => {
            const { name, price } = orderItem.item;
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
  // const { data, error } = useFetchApi("/orders");
  // console.log({data, error}); 

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken'); 
    const loggedInUserId = jwtDecode(accessToken).user;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    
    // Get all orders by the currently logged in user
    api.get(`/orders?userId=${loggedInUserId}`, config).then(response => {
      console.log(response.data); 
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

            <TableCell sx={{bgcolor: 'primary.light'}} align="right">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Price</Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
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
