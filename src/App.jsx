import './App.css'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Navbar from './components/Navbar/Navbar'
import MenuItemCard from './components/MenuItemCard/MenuItemCard'
import Grid from '@mui/material/Unstable_Grid2'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import MenuPage from './pages/MenuPage/MenuPage'
import HomePage from './pages/HomePage/HomePage'
// This hook gets the INITIAL LOGGED-IN INFO. Keyword => INITIAL, i.e info when the app renders on whether the user is logged in or not
import useIsLoggedIn from '../hooks/useIsLoggedIn'
import { LoggedInUserContext } from './contexts/loggedInUserContext'
import ProfilePage from './pages/ProfilePage/Profile'

const hideNavbarOnPages = [
  '/login',
  '/register',
]

function App() {

  const {
    isLoggedIn,
    loggedInUser,
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  } = useIsLoggedIn();

  const hideNavBar = false;
  return (
    <>
      <LoggedInUserContext.Provider value={{
        isLoggedIn,
        loggedInUser,
        setIsLoggedIn,
        setLoggedInUser,
        errorCheckingLogin
      }}>

        { hideNavBar || <Navbar></Navbar> }

        <Container sx={{ py: 10 }}>
          {/* <MenuPage /> */}
          {/* <HomePage /> */}
          <ProfilePage/>
        </Container>

      </LoggedInUserContext.Provider>
    </>

  )
}

export default App
