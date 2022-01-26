import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { StyledEngineProvider } from '@mui/material'
import './styles/index.scss'
import 'normalize.css' //сброс стилей
import { BrowserRouter } from 'react-router-dom'
import App from './App'

render(
  /* Provider store - связывает реакт и редакс */
  /* StyledEngineProvider - позволяет переопределять стили MUI из CSS */
  /* BrowserRouter - постраничная навигация в браузере */
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </Provider>,
  document.querySelector('#root')
)
