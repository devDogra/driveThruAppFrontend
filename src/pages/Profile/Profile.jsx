import { useState } from "react"

export default function Profile() {
  const { 
    isLoggedIn, 
    loggedInUser, 
    setIsLoggedIn,
    setLoggedInUser,
    error: errorCheckingLogin
  } = useIsLoggedIn();


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
