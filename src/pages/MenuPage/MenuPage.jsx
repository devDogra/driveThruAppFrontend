import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Navbar from '../../components/Navbar/Navbar'
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard'
import Grid from '@mui/material/Unstable_Grid2'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { nanoid } from 'nanoid'

export default function MenuPage() {

  return (
    <>

      {/* <Breadcrumbs aria-label="breadcrumb" sx={{my:4}}>
        <Link underline="hover" color="inherit" href="/">
          BurgerXYZ
        </Link>
        <Typography color="text.primary" fontWeight={"bold"} fontSize={"150%"}>Menu</Typography>
      </Breadcrumbs> */}

        <Grid container spacing={6}>
            {
              new Array(20).fill((
                <Grid xs={"auto"}>
                  <MenuItemCard></MenuItemCard>
                </Grid>
              ))
            }
        </Grid>

    </>
  )
}

