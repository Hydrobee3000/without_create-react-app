import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
/* хук из редакса для отправки изменений в стейт(в данном случае AC(Action Creator), за которым следит saga) */
import { useDispatch } from 'react-redux'
import { fetchData } from '@/redux/reducers/tableReducer'
/*AC, за которым следит saga и при его диспатче, запускает воркера,
 который получит данные с сервера(у нас mock api) и установит их в стейт в tableReducer*/
import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="header" position="static">
        <Toolbar>
          <Typography className="header__title" variant="h6" component="div">
            Table with some data
          </Typography>
          <Button className="header__button" onClick={() => dispatch(fetchData())}>
            Get
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
