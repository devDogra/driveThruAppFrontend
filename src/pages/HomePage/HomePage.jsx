import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Divider  from '@mui/material/Divider'
import Iframe from 'react-iframe'
import Map from '../../components/Map/Map'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'


export default function HomePage() {
    const mapURL_GOOGLE = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3497.9984429399815!2d77.1175630203607!3d28.749463447111697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1698052251851!5m2!1sen!2sin"

  return (
    <>
        <Breadcrumbs aria-label="breadcrumb" sx={{my:4}}>
            <Link underline="hover" color="inherit" href="/">
            BurgerXYZ
            </Link>
            <Typography color="text.primary" fontWeight={"bold"} fontSize={"150%"}>Home</Typography>
        </Breadcrumbs>

    

        <Box sx={{my:4}}>
            <Typography variant='h3' textTransform='uppercase' fontWeight='bold'>
                Best Sellers
            </Typography>

            <Stack spacing={6} sx={{ my: 4, mb: 6}} direction="row" useFlexGap>
                <MenuItemCard/>
                <MenuItemCard/>
                <MenuItemCard/>
                <MenuItemCard/>
            </Stack>

            <Button variant="contained" size="large" endIcon={<ArrowRightAltIcon/>}>Go to Menu </Button>
        </Box>

        <Divider sx={{borderBottomWidth:1}}></Divider>

        <Box sx={{my:4}}>
  

            <Stack spacing={8} sx={{ my: 4, mb: 6}} direction="row" useFlexGap>
                <Map width={425} height={400} url={mapURL_GOOGLE} />
                <Box>
                    <Typography variant='h3' textTransform='uppercase' fontWeight='bold' my={2}>
                        BurgerXYZ
                    </Typography>

                    <Typography my={2}>
                        We sell burgers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem est debitis praesentium mollitia voluptatibus veniam, eius architecto omnis autem ea?
                    </Typography>

                    <List>
                        <ListItem divider>
                            <ListItemText variant='h4'>Contact: </ListItemText>
                            <ListItemText sx={{ width: "50%", overflow:"wrap"}}>9811061693
                            </ListItemText>
                        </ListItem>

                        <ListItem divider>
                            <ListItemText variant='h4'>Address: </ListItemText>
                            <ListItemText sx={{ width: "50%", overflow:"wrap"}}>Shahbad Daulatpur, Main Bawana Road New Delhi - 110042 Delhi NCR, India
                            </ListItemText>
                        </ListItem>
                    </List>

                    <Button variant="contained" size="large" endIcon={<ArrowRightAltIcon/>} sx={{width:400, mt:6}}>Go to Menu </Button>
                </Box>
            </Stack>

  
        </Box>
        
        <Divider sx={{borderBottomWidth:1}}></Divider>




    </>
  )
}
