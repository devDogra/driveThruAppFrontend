import './App.css'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Navbar from './components/Navbar/Navbar'
import MenuItemCard from './components/MenuItemCard/MenuItemCard'

function App() {

  return (
    <>
      <Navbar />
      <Container sx={{ bgcolor: 'tomato', p:3}}>
        <MenuItemCard></MenuItemCard>
        <MenuItemCard></MenuItemCard>
        <MenuItemCard></MenuItemCard>
        <MenuItemCard></MenuItemCard>
      </Container>
    </>
  )
}

export default App
