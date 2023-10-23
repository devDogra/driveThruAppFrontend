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

export default function MenuItemCard() {
  return (
    <Card sx={{ maxWidth: 256 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={BurgerImage}
        title="burger image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Burger
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a really good burger
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent:"space-between", px:2 }}>
        <Box sx={{ display:"flex" }}>
            <CurrencyRupeeIcon></CurrencyRupeeIcon>
            <Typography>200</Typography>
        </Box>
        <Button size="small">Add+</Button>
      </CardActions>
    </Card>
  );
}
