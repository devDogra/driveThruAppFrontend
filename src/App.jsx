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
import { YourOrderContext } from './contexts/yourOrderContext';

import ProfilePage from './pages/ProfilePage/ProfilePage'
import { Routes, Route } from 'react-router-dom'
import DynamicBreadcrumbs from './components/DynamicBreadcrumbs/DynamicBreadcrumbs'
import useFetchApi from '../hooks/useFetchApi'
import {useState} from 'react'


const hideNavbarOnPages = [
  '/login',
  '/register',
]


function getOrderItem(name, price, quantity) {
  return {
    item: {
      name,
      price,
    },
    quantity,
  }

}
const rows = [
  getOrderItem('Burger', 200, 2),
  getOrderItem('Coke (Large)', 70, 2),
  getOrderItem('Fries', 120, 1),
  getOrderItem('Fries2', 120, 1),
  getOrderItem('Fries3', 120, 1),
  getOrderItem('Fries4', 120, 1),
  getOrderItem('Fries5', 120, 1),
  getOrderItem('Fries6', 120, 1),
  getOrderItem('Fries7', 120, 1),
  getOrderItem('Fries8', 120, 1),
  getOrderItem('Fries9', 120, 1),
];

function App() {

  const {
    isLoggedIn,
    loggedInUser,
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  } = useIsLoggedIn();


  const { error, data } = useFetchApi('/menuItems', { allMenuItems: [] });

  const [yourOrder, setYourOrder] = useState(rows);
  const [yourOrderTableModalOpen, setYourOrderTableModalOpen] = useState(false);

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
          <YourOrderContext.Provider value={{
            yourOrder,
            yourOrderTableModalOpen,
            setYourOrderTableModalOpen,
            setYourOrder,
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

          </YourOrderContext.Provider>
        </MenuItemsContext.Provider>
      </LoggedInUserContext.Provider>
    </>

  )
}

export default App
