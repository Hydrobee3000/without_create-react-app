/* блочный элемент */
import Box from '@mui/material/Box'
/* заголовок */
import Header from '../Header/Header'
/* основная таблица */
import MainTable from '../Table/Table'
/* стили */
import './App.scss'

const App = () => {
  return (
    <Box>
      <Header />
      <MainTable />
    </Box>
  )
}

export default App
