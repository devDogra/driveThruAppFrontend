import './App.css'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

function App() {

  return (
    <Container sx={{ bgcolor: 'tomato', p:3}}>
      <Paper elevation={3}>
        <Typography>Hello World</Typography>
      </Paper>
    </Container>
  )
}

export default App
