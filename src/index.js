import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { StyledEngineProvider } from '@mui/material'
import './styles/index.scss'
import 'normalize.css' //сброс стилей
import { BrowserRouter } from 'react-router-dom'
import App from './App'

render(
  /* Provider store - связывает react и redux */
  /* BrowserRouter - постраничная навигация в браузере */
  /* StyledEngineProvider - позволяет переопределять стили MUI из CSS */
  <Provider store={store}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
