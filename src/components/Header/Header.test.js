import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
/* компонент содержит NavLink из react-router-dom, поэтому для теста компонент нужно обернуть роутером */
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import Header from './Header'
import userEvent from '@testing-library/user-event'

// describe('проверка тестов в Header', () => {
test('рендеринг/навигация компонента Header ', () => {
  const history = createMemoryHistory()
  history.push('/table-data')

  render(
    <BrowserRouter history={history}>
      <Header />
    </BrowserRouter>
  )
  //   screen.debug()
  const homeLinkEl = screen.getByText(/Главная/i)
  expect(homeLinkEl).toBeInTheDocument()

  const tableLinkEl = screen.getByText(/Таблица с данными/i)
  expect(tableLinkEl).toBeInTheDocument()

  expect(history.location.pathname).toBe('/table-data')

  history.push('/')
  expect(history.location.pathname).toBe('/')

  //   expect(screen.getByText(/table page/i)).toBeInTheDocument()

  // fireEvent.click(tableLinkEl)
  // expect(history.location.pathname).toBe('/table-data')
})
// })
/*

test('путь будет "главная страница" ', () => {
  let navigate = useNavigate()
  const { container, getByTestId } = render(
    <BrowserRouter history={navigate}>
      <Header />
    </BrowserRouter>
  )
  const navbar = getByTestId('navbar')
  const homeLink = getByTestId('home-link')

  fireEvent.click(getByTestId('table-link'))
  // expect(container.innerHTML).toMatch(/table page/i)

  // expect
  // const linkElement = screen.getByText(/Главная/i)
  // expect(linkElement).toBeInTheDocument()
})
*/
