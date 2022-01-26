import { render } from 'react-dom'
import MainScreen from './components/MainScreen/MainScreen'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { StyledEngineProvider } from '@mui/material'
import './styles/index.scss'
import 'normalize.css' //сброс стилей

render(
  /* Provider store - связывает реакт и редакс */
  /* StyledEngineProvider - позволяет переопределять стили MUI из CSS */
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <MainScreen />
    </StyledEngineProvider>
  </Provider>,
  document.querySelector('#root')
)
