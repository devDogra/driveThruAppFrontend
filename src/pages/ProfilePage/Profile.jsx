import { useState } from "react"
import { LoggedInUserContext } from "../../contexts/loggedInUserContext";
import { useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 

export default function ProfilePage() {
  const { 
    isLoggedIn, 
    loggedInUser, 
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  }  = useContext(LoggedInUserContext);


  return (
    <Box>
      <Typography>
        {
          JSON.stringify({
            isLoggedIn, loggedInUser
          })
        }
      </Typography>
    </Box>
  )

}
