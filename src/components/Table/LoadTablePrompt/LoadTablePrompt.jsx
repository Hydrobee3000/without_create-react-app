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
import { useDispatch } from 'react-redux'
/* стили */
import styles from './LoadTablePrompt.module.scss'
import { fetchData } from '@/store/reducers/tableReducer'

const LoadTablePrompt = () => {
  /* хук для отправки AC(action creator's) */
  const dispatch = useDispatch()

  /* происходит ли сейчас загрузка данных (boolean), значение поля loading */
  const loading = useSelector((state) => state.tableReducer.loading)
  /* данные для таблицы из tableReducer */
  const dataTable = useSelector((state) => state.tableReducer.items.data)

  /* если данных нет, показать подсказку*/
  return (
    <>
      <Box>
        <Alert severity="info">Загрузите данные, нажав кнопку ЗАГРУЗИТЬ</Alert>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20rem' }}>
        <Button
          className={styles.prompt__button}
          /* при клике на кнопку отправляем AC и сага, которая следит за изменением этого AC, запросит и получит данные, 
            и запишет их в стейт  */
          onClick={() => dispatch(fetchData())}
          /* если происходит загрузка(loading = true) - блокируем кнопку */
          disabled={loading}
          /* стиль кнопки - полная заливка */
          variant="contained"
        >
          Загрузить
        </Button>
      </Box>
    </>
  )
}

export default LoadTablePrompt
