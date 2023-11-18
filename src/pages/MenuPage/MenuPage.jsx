import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Navbar from '../../components/Navbar/Navbar'
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard'
import Grid from '@mui/material/Unstable_Grid2'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { nanoid } from 'nanoid'
import { useContext, useEffect, useState } from 'react'
import api from '../../../config/axios.config'
import Box from '@mui/material/Box'; 
import Alert from '@mui/material/Alert'; 
import Snackbar from '@mui/material/Snackbar'; 
import { MenuItemsContext } from '../../contexts/menuItemsContext'
import { YourOrderContext } from '../../contexts/yourOrderContext'
import { LoggedInUserContext } from '../../contexts/loggedInUserContext'
import YourOrderTableModal from '../../components/YourOrderTableModal/YourOrderTableModal'

export default function MenuPage() {
  const { allMenuItems : menuItems } = useContext(MenuItemsContext);

  const { 
    yourOrder,
    setYourOrder, 
    yourOrderTableModalOpen, 
    setYourOrderTableModalOpen 
  } = useContext(YourOrderContext)

  const {
    isLoggedIn,
    loggedInUser,
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  } = useContext(LoggedInUserContext);

  const [pleaseLoginSnackbarOpen, setPleaseLoginSnackbarOpen] = useState(false);

  return (
    <>
        <Grid container spacing={6}>
            {
              menuItems.map(item => (
                <Grid xs={"auto"} key={item._id}>
                  <MenuItemCard 
                    item={item} 
                    openYourOrderTableModal={() => {
                      if (isLoggedIn) {
                        setYourOrderTableModalOpen(true)
                      } else {
                        setPleaseLoginSnackbarOpen(true); 
                      }
                    }}
                  >
                  </MenuItemCard>
                </Grid>
              ))
            }
        </Grid>

        <YourOrderTableModal></YourOrderTableModal>

        <Snackbar
          open={pleaseLoginSnackbarOpen}
          autoHideDuration={2000}
          onClose={() => setPleaseLoginSnackbarOpen(false)}
          message="Login to order"
        />

    </>
  )
}

