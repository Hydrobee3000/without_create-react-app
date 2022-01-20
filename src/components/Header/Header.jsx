import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
/* хук из редакса для отправки изменений в стейте(в данном случае AC(Action Creator), за которым следит saga) */
import { useDispatch } from 'react-redux'
/*AC, за которым следит saga и при его диспатче, запускает воркера,
 который получит данные с сервера(у нас mock api) и установит их в стейт в tableReducer*/
import { fetchData } from '@/redux/tableReducer'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Table with some data
          </Typography>
          <Button color='inherit' onClick={() => dispatch(fetchData())}>
            Get
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
