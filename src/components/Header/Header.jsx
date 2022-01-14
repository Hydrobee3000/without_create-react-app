import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../redux/tableReducer'
import s from './Header.module.css'
import image from '../../../images/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg'

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
          <img src={image} alt="image" width="250" />
    
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
