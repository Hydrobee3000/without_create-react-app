import MainPage from '../pages/MainPage'
import TablePage from '../pages/TablePage'
import { Routes, Route } from 'react-router-dom'

// export const routes = [
//   { path: '/', element: MainPage },
//   { path: '/table', element: TablePage },
// ]

const AppRoutes = () => {
  return (
    <Routes>
      {/* если путь "/" (главная страница) или " * " (любой не найденный путь), тогда отобразит главную страницу */}
      <Route path={'/' && '*'} element={<MainPage />} />
      <Route path="/table-data" element={<TablePage />} />
    </Routes>
  )
}

// <Box>
// <MainPage />
// <TablePage />
// </Box>

export default AppRoutes
