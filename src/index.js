import { render } from 'react-dom'
import App from './components/App/App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { StyledEngineProvider } from '@mui/material'
import './styles/index.scss'
import 'normalize.css' //сброс стилей

render(
  /* Provider store - связывает реакт и редакс */
  /* StyledEngineProvider - позволяет переопределять стили MUI из CSS */
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
  document.querySelector('#root')
)
