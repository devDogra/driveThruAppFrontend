import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { blueGrey } from '@mui/material/colors';


function createData(name, calories, fat, ) {
  return { name, calories, fat, carbs, protein };
}

function getOrderItem(name, price, quantity) {
  return {
    item: {
      name, 
      price,
    },
    quantity,
  }

}
const rows = [
  getOrderItem('Burger', 200, 2),
  getOrderItem('Coke (Large)', 70, 2),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries', 120, 1),
];

export default function YourOrderTable() {
  return (
    <TableContainer component={Paper} sx={{maxHeight: 300}}>
      <Table stickyHeader sx={{ minWidth: 650, "& .MuiTableRow-root:hover": {
      backgroundColor: blueGrey[50],
    
    } }} size="small" aria-label="a dense table" >
        <TableHead >
          <TableRow hover>
            <TableCell sx={{bgcolor: 'primary.light'}}>
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Item</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}} align="right">
              <Typography variant="p" fontWeight="bold"textTransform="uppercase">Quantity</Typography>
            </TableCell>

            <TableCell sx={{bgcolor: 'primary.light'}} align="right">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Price</Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, hover: {
                bgcolor:'red'
              } }}
            >
              <TableCell component="th" scope="row">
                {row.item.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.quantity * row.item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
