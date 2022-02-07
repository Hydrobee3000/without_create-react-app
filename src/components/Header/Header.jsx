/* элемент заголовка(хедера) */
import AppBar from '@mui/material/AppBar'
/* блочный элемент  */
import Box from '@mui/material/Box'
/* элемент, содержащий инструменты  */
import Toolbar from '@mui/material/Toolbar'
/* текст с заданными характеристиками  */
import Typography from '@mui/material/Typography'
/* позволяет менять путь(роут) при переходе по ссылке(между страницами) */
import { NavLink } from 'react-router-dom'
/* стили */
import styles from './Header.module.scss'

const Header = () => {
  return (
    <Box>
      <AppBar className={styles.header} position="static">
        <Toolbar>
          <NavLink to="/" className={styles.header__link + ' ' + styles.link__home}>
            <Typography className={styles.header__title} variant="h6" component="div">
              Главная
            </Typography>
          </NavLink>
          <NavLink to="/table-data" className={styles.header__link + ' ' + styles.link__common}>
            <Typography variant="body1" component="div">
              Таблица с данными
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
