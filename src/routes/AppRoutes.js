import HomePage from '../pages/HomePage'
import TablePage from '../pages/TablePage'
import { Routes, Route } from 'react-router-dom'

/* пути приложения */
const AppRoutes = () => {
  return (
    <Routes>
      {/* если путь "/" (главная страница) или " * " (любой не найденный путь), тогда отобразит главную страницу */}
      <Route path={'/' && '*'} element={<HomePage />} />
      <Route path="/table-data" element={<TablePage />} />
    </Routes>
  )
}

export default AppRoutes
