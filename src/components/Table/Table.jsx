import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { Loader } from './../Loader/Loader'

const MainTable = () => {
  /* данные для таблицы из tableReducer */
  const dataTable = useSelector((state) => state.tableReducer.items.data)
  /* происходит ли сейчас загрузка данных (boolean), значение поля isFetching */
  const loading = useSelector((state) => state.tableReducer.isFetching)
  /* если происходит загрузка данных(loading === true), тогда отрисуем прелоадер */
  if (loading) {
    return <Loader />
  }
  /* если все данные пришли и загрузка завершена(loading === false), тогда отрисуем разметку с соответсвующими данными */
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightGrey' }}>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Street</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row) => (
            // мапим данные таблицы из стейта tableReducer, на каждую запись отрисовываем строку с тремя столбцами
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.street}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MainTable
