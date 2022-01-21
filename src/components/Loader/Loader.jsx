import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
      <CircularProgress />
    </Box>
  )
}
// paddingLeft: '50%', paddingTop: '15%'
