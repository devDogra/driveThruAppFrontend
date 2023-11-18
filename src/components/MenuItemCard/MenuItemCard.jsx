import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BurgerImage from '../../assets/burger.jpeg'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Box from '@mui/material/Box'
import { YourOrderContext } from '../../contexts/yourOrderContext';
import { useContext } from 'react';

export default function MenuItemCard({ item, openYourOrderTableModal }) {
  const { 
    yourOrder,
    setYourOrder, 
    yourOrderTableModalOpen, 
    setYourOrderTableModalOpen 
  } = useContext(YourOrderContext)

  function handleAddClick(itemToAdd) {
    openYourOrderTableModal(); 
    // Add the clicked item to yourOrder
  
    // 1 Check if this item is already in the order, and if it is, then do nothing just open the your order modal
    // 2 If it is not, add it
    // So to check we'll require look ups
    // Use filter, but better is to maintain a set of items
    // DOES NOT MATTER because an order will be very small, so complexity won't be an issue
    
    const itemAlreadyInOrder = yourOrder.find(item => item._id == itemToAdd._id); 
    if (itemAlreadyInOrder) return;

    // else, this item is not already in our order so add it with quantity 1
    setYourOrder([...yourOrder, { item: itemToAdd, quantity: 1}])
    console.log({yourOrder}); 

  }

  return (
    <Card sx={{ maxWidth: 256 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={item.img}
        title="burger image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { item.name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { item.description }
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent:"space-between", px:2 }}>
        <Box sx={{ display:"flex" }}>
            <CurrencyRupeeIcon></CurrencyRupeeIcon>
            <Typography>{ item.price }</Typography>
        </Box>
        <Button size="small" onClick={() => handleAddClick(item)}>Add+</Button>
      </CardActions>
    </Card>
  );
}
