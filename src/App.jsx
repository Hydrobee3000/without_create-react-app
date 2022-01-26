/* блочный элемент */
import Box from '@mui/material/Box'
/* заголовок */
/* основная таблица */
/* стили */
import './App.scss'
import Header from './components/Header/Header'
import { AppRoutes } from './routes/AppRoutes'

const App = () => {
  return (
    <Box>
      <Header />
      <AppRoutes />
    </Box>
  )
}

export default App
