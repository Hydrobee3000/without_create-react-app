/* элемент 'таблица' */
import Table from '@mui/material/Table'
/* элемент 'тело таблицы' */
import TableBody from '@mui/material/TableBody'
/* элемент 'ячейка таблицы' */
import TableCell from '@mui/material/TableCell'
/* элемент 'контейнер таблицы' */
import TableContainer from '@mui/material/TableContainer'
/* элемент 'заголовок(хедер) таблицы' */
import TableHead from '@mui/material/TableHead'
/* элемент 'строка таблицы' */
import TableRow from '@mui/material/TableRow'
/* элемент 'бумага' (фон) */
import Paper from '@mui/material/Paper'
/* хук, позволяющий получить данные из стейта редакса */
import { useSelector } from 'react-redux'
/* компонент загрузчика */
import { Preloader } from './../common/Preloader/Preloader'
/* подсказка о загрузке страницы с кнопкой 'загрузить' */
import LoadTablePrompt from './LoadTablePrompt/LoadTablePrompt'
/* стили */
import styles from './Table.module.scss'

const MainTable = () => {
  /* данные для таблицы из tableReducer */
  const dataTable = useSelector((state) => state.tableReducer.items.data)
  /* происходит ли сейчас загрузка данных (boolean), значение поля loading */
  const loading = useSelector((state) => state.tableReducer.loading)
  /* если происходит загрузка данных(loading === true), тогда отрисуем прелоадер */
  if (loading) {
    return <Preloader />
  }
  /* если все данные пришли и загрузка завершена(loading === false), тогда отрисуем дальнейшую разметку */

  /* если данных нет, показать подсказку 'загрузить таблицу' */
  if (!dataTable) {
    return <LoadTablePrompt />
  }
  /* если данные пришли отрисуем таблицу с ними */
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={styles.tableHead__row}>
            <TableCell>Имя</TableCell>
            <TableCell>Значение</TableCell>
            <TableCell>Улица</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row) => (
            // мапим данные таблицы из стейта tableReducer, на каждую запись отрисовываем строку с тремя столбцами
            <TableRow key={row.name}>
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
