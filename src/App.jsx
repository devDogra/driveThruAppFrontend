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
import { MenuItemsContext } from './contexts/menuItemsContext'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { Routes, Route } from 'react-router-dom'
import DynamicBreadcrumbs from './components/DynamicBreadcrumbs/DynamicBreadcrumbs'
import useFetchApi from '../hooks/useFetchApi'

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


  const { error, data } = useFetchApi('/menuItems', { allMenuItems: [] });

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
        <MenuItemsContext.Provider value={{
          allMenuItems: data?.allMenuItems,
        }}>

          {hideNavBar || (
            <Navbar></Navbar>
          )}

          <Container sx={{ py: 10 }}>
            {/* <MenuPage /> */}
            {hideNavBar || <DynamicBreadcrumbs />}


            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
            {/* <HomePage /> */}
            {/* <ProfilePage/> */}
          </Container>

          
        </MenuItemsContext.Provider>
      </LoggedInUserContext.Provider>
    </>

  )
}

export default App
