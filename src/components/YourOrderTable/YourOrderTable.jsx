import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { blueGrey } from '@mui/material/colors';
import { useContext } from 'react';
import { YourOrderContext } from '../../contexts/yourOrderContext';
// function getOrderItem(name, price, quantity) {
//   return {
//     item: {
//       name,
//       price,
//     },
//     quantity,
//   }

// }
// const rows = [
//   getOrderItem('Burger', 200, 2),
//   getOrderItem('Coke (Large)', 70, 2),
//   getOrderItem('Fries', 120, 1),
// ];

export default function YourOrderTable({modalStyle}) {
  const { 
    yourOrder: rows, 
    setYourOrder, 
    yourOrderTableModalOpen, 
    setYourOrderTableModalOpen 
  } = useContext(YourOrderContext)

  console.log(rows); 

  return (
    <TableContainer component={Paper} sx={ modalStyle || { maxHeight: 300 }}>
      <Table stickyHeader sx={{
        minWidth: 650, "& .MuiTableRow-root:hover": {
          backgroundColor: blueGrey[50],

        }
      }} size="small" aria-label="a dense table" >
        <TableHead >
          <TableRow hover>
            <TableCell sx={{ bgcolor: 'primary.light', pl: 8 }} align="start">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Item</Typography>
            </TableCell>

            <TableCell sx={{ bgcolor: 'primary.light' }} align="center">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Quantity</Typography>
            </TableCell>

            <TableCell sx={{ bgcolor: 'primary.light' }} align="center">
              <Typography variant="p" fontWeight="bold" textTransform="uppercase">Price</Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.item.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }, hover: {
                  bgcolor: 'red'
                }
              }}
            >

              <TableCell component="th" scope="row" >
                <Box sx={{ display: "flex", alignItems: "center", }}>
                  <IconButton aria-label="delete" size="large">
                    <DeleteIcon />
                  </IconButton>

                  <Typography>
                    {row.item.name}
                  </Typography>
                </Box>

              </TableCell>

              <TableCell align="right">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconButton>
                    <RemoveIcon></RemoveIcon>
                  </IconButton>

                  <Typography>{row.quantity}</Typography>

                  <IconButton>
                    <AddIcon></AddIcon>
                  </IconButton>
                </Box>
              </TableCell>

              <TableCell align="center">
                {row.quantity * row.item.price}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
