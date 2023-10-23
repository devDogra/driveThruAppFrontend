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

function App() {
  const hideNavbarOnPages = [
    '/login',
    '/register',
  ]
  const hideNavBar = false; 
  return (
    <>
      {
        hideNavBar || <Navbar></Navbar>
      }
      <MenuPage />
    </>
  )
}

export default App
