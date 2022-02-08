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
          <Typography className={styles.header__title} variant="h6" component="div">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `${isActive ? styles.link__home_active : undefined} ${styles.header__link} ${
                  styles.link__home
                }`
              }
            >
              Главная
            </NavLink>
          </Typography>
          <Typography variant="body1" component="div">
            <NavLink
              to="/table-data"
              className={({ isActive }) =>
                `${isActive ? styles.link__common_active : undefined} ${styles.header__link} ${
                  styles.link__common
                }`
              }
            >
              Таблица с данными
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
