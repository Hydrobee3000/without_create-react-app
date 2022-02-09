import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

/* динамический импорт с помощью react.lazy - позволяет подгружать код HomePage, при переходе на главную(домашнюю) страницу */
const HomePage = React.lazy(() => import(/* webpackChunkName: "HomePage" */ '../pages/HomePage'))
/* динамический импорт с помощью react.lazy - позволяет подгружать код TablePage, при переходе на страницу с таблицей */
const TablePage = React.lazy(() => import(/* webpackChunkName: "TablePage" */ '../pages/TablePage'))
import { Preloader } from './../components/common/Preloader/Preloader'

/* пути приложения */
const AppRoutes = () => {
  return (
    /* suspense используется, чтобы отобразить что-то(загрузчик), пока не загрузились файлы приложения (должен быть выше) */
    <Suspense fallback={<Preloader />}>
      <Routes>
        {/* если путь "/" (главная страница) или " * " (любой не найденный путь), тогда отобразит главную страницу */}
        <Route path={'/' && '*'} element={<HomePage />} />
        <Route path="/table-data" element={<TablePage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
