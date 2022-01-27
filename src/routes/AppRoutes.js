import HomePage from '../pages/HomePage'
import TablePage from '../pages/TablePage'
import { Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      {/* если путь "/" (главная страница) или " * " (любой не найденный путь), тогда отобразит главную страницу */}
      <Route path={'/' && '*'} element={<HomePage />} />
      <Route path="/table-data" element={<TablePage />} />
    </Routes>
  )
}

// <Box>
// <MainPage />
// <TablePage />
// </Box>

export default AppRoutes
