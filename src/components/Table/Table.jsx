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
/* блочный элемент */
import Box from '@mui/material/Box'
/* элемент 'внимание'(подсказка) */
import Alert from '@mui/material/Alert'
/* элемент кнопки */
import Button from '@mui/material/Button'
/* хук, позволяющий получить данные из стейта редакса */
import { useSelector } from 'react-redux'
/*AC, за которым следит saga и при его диспатче, запускает воркера,
 который получит данные с сервера(у нас mock api) и установит их в стейт в tableReducer*/
import { fetchData } from '@/store/reducers/tableReducer'
/* компонент загрузчика */
import { Preloader } from './../Preloader/Preloader'
/* стили */
import styles from './Table.module.scss'
import { useDispatch } from 'react-redux'

const MainTable = () => {
  /* хук для отправки AC(action creator's) */
  const dispatch = useDispatch()

  /* данные для таблицы из tableReducer */
  const dataTable = useSelector((state) => state.tableReducer.items.data)
  /* происходит ли сейчас загрузка данных (boolean), значение поля isFetching */
  const loading = useSelector((state) => state.tableReducer.loading)
  /* если происходит загрузка данных(loading === true), тогда отрисуем прелоадер */
  if (loading) {
    return <Preloader />
  }
  /* если все данные пришли и загрузка завершена(loading === false), тогда отрисуем дальнейшую разметку */

  /* если данных нет, показать подсказку*/
  if (!dataTable) {
    return (
      <>
        <Box>
          <Alert severity="info">Загрузите данные, нажав кнопку ЗАГРУЗИТЬ</Alert>
          {/* кнопку вынести в table- компонент */}
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '6em' }}>
          <Button
            className={styles.header__button}
            /* при клике на кнопку отправляем AC и сага, которая следит за изменением этого AC, запросит и получит данные, 
            и запишет их в стейт  */
            onClick={() => dispatch(fetchData())}
            /* если происходит загрузка(loading = true) - блокируем кнопку */
            disabled={loading}
            variant="contained"
          >
            {
              /* если данных нет, надпись кнопки = "GET"; если данные уже имеются, надпись = "UPDATE" */
              dataTable ? 'Обновить' : 'Загрузить'
            }
          </Button>
        </Box>
      </>
    )
  }
  /* если данные пришли отрисуем таблицу с ними */
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={styles.tableHead__row}>
            <TableCell>Название</TableCell>
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
