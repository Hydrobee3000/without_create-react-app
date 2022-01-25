import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import './Preloader.scss'

/* Показывает анимированный загрузчик */
export const Preloader = () => {
  return (
    <Box className="container__preloader">
      <CircularProgress className="preloader" />
    </Box>
  )
}
