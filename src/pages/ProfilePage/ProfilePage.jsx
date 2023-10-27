import { useState } from "react"
import { LoggedInUserContext } from "../../contexts/loggedInUserContext";
import { useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Paper from '@mui/material/Paper'
import YourOrderTable from "../../components/YourOrderTable/YourOrderTable";

export default function ProfilePage() {
  const {
    isLoggedIn,
    loggedInUser,
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  } = useContext(LoggedInUserContext);


  return (
    <>
      <Typography>
        {
          JSON.stringify({
            isLoggedIn, loggedInUser
          })
        }
      </Typography>

      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 4 }}>
        <Link underline="hover" color="inherit" href="/">
          BurgerXYZ
        </Link>
        <Typography color="text.primary" fontWeight={"bold"} fontSize={"150%"}>Profile</Typography>
      </Breadcrumbs>


      <Box sx={{display:'flex', gap:"2rem"}}>
        <Box>
        <Paper sx={{display: 'flex', gap: "1rem", p: 4, flexShrink:1 }} profile-card>

          <AccountBoxIcon sx={{ fontSize: "6rem", alignSelf:'center' }}></AccountBoxIcon>
          <Box>
            <Typography variant='h6' textTransform='uppercase' mb={1} fontWeight='bold'>
              {loggedInUser?.firstName}
            </Typography>

            <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
              <PhoneAndroidIcon></PhoneAndroidIcon>
              <Typography variant='p' fontWeight='bold' >
                {loggedInUser?.phone}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
              <BadgeIcon></BadgeIcon>
              <Typography variant='p' fontWeight='bold' >
                {loggedInUser?.role}
              </Typography>
            </Box>
          </Box>


        </Paper>
          </Box>

        <Box your-order sx={{ flexGrow:1, p:2, bgcolor:'red' }}>
          <Typography variant="h5" textTransform="uppercase" fontWeight="bold" mb={3}>
            Your Order
          </Typography>
          <YourOrderTable></YourOrderTable>
        </Box>
      </Box>

      <Button variant="contained" size="large" endIcon={<ArrowRightAltIcon />}>Go to Menu </Button>

      <Divider sx={{ borderBottomWidth: 1 }}></Divider>
    </>
  )

}
