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
import { MenuItemsContext } from '../../contexts/menuItemsContext'

export default function MenuPage() {
  const { allMenuItems : menuItems } = useContext(MenuItemsContext);
  console.log({menuItems}); 
  return (
    <>
        <Grid container spacing={6}>
            {
              menuItems.map(item => (
                <Grid xs={"auto"}>
                  <MenuItemCard item={item}></MenuItemCard>
                </Grid>
              ))
            }
        </Grid>

    </>
  )
}

