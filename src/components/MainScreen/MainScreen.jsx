/* блочный элемент */
import Box from '@mui/material/Box'
/* заголовок */
import Header from '../Header/Header'
/* основная таблица */
import MainTable from '../Table/Table'
/* стили */
import './MainScreen.scss'

const MainScreen = () => {
  return (
    <Box>
      <Header />
      <MainTable />
    </Box>
  )
}

export default MainScreen
