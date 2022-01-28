/* элемент заголовка(хедера) */
import AppBar from '@mui/material/AppBar'
/* блочный элемент  */
import Box from '@mui/material/Box'
/* элемент, содержащий инструменты  */
import Toolbar from '@mui/material/Toolbar'
/* текст с заданными характеристиками  */
import Typography from '@mui/material/Typography'
/* элемент кнопки */
import Button from '@mui/material/Button'
/* хук из редакса для отправки изменений в стейт(в данном случае AC(Action Creator), за которым следит saga) */
import { useDispatch, useSelector } from 'react-redux'
/*AC, за которым следит saga и при его диспатче, запускает воркера,
 который получит данные с сервера(у нас mock api) и установит их в стейт в tableReducer*/
import { fetchData } from '@/store/reducers/tableReducer'
/* стили */
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  /* хук для отправки AC(action creator's) */
  const dispatch = useDispatch()

  /* данные для таблицы из tableReducer */
  const dataTable = useSelector((state) => state.tableReducer.items.data)

  /* происходит ли сейчас загрузка данных (boolean), значение поля isFetching */
  const loading = useSelector((state) => state.tableReducer.loading)

  return (
    <Box>
      <AppBar className={styles.header} position="static">
        <Toolbar>
          <Typography className={styles.header__title} variant="h6" component="div">
            <Link to="/" className={styles.header__link + ' ' + styles.link__home}>
              Главная
            </Link>
          </Typography>
          <Typography variant="body1" component="div">
            <Link to="/table-data" className={styles.header__link + ' ' + styles.link__common}>
              Таблица с данными
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
