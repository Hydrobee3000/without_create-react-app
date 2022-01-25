import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
/* хук из редакса для отправки изменений в стейт(в данном случае AC(Action Creator), за которым следит saga) */
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/redux/reducers/tableReducer'
/*AC, за которым следит saga и при его диспатче, запускает воркера,
 который получит данные с сервера(у нас mock api) и установит их в стейт в tableReducer*/
import styles from './Header.module.scss'

const Header = () => {
  /* хук для отправки AC(action creator's) */
  const dispatch = useDispatch()

  /* происходит ли сейчас загрузка данных (boolean), значение поля isFetching */
  const loading = useSelector((state) => state.tableReducer.loading)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.header} position="static">
        <Toolbar>
          <Typography className={styles.header__title} variant="h6" component="div">
            Table with some data
          </Typography>
          <Button
            className={styles.header__button}
            /* при клике на кнопку отправляем AC и сага, которая следит за изменением этого AC, запросит и получит данные, 
            и запишет их в стейт  */
            onClick={() => dispatch(fetchData())}
            /* если происходит загрузка(loading = true) - блокируем кнопку */
            disabled={loading}
          >
            Get
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
