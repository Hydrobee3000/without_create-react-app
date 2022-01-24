import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import './Loader.scss'

export const Loader = () => {
  return (
    <Box className="container__preloader">
      <CircularProgress className="preloader" />
    </Box>
  )
}
// paddingLeft: '50%', paddingTop: '15%'
