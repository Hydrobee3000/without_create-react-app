import Box from '@mui/material/Box' //блочный элемент
import Header from './components/Header/Header' //шапка сайта
import AppRoutes from './routes/AppRoutes' //роуты приложения

/* главный компонент, содержащий всю UI составляющую приложения */

const App = () => {
  return (
    <Box>
      {/* заголовок */}
      <Header />
      {/* компонент, в котором указаны роуты приложения */}
      <AppRoutes />
    </Box>
  )
}

export default App
