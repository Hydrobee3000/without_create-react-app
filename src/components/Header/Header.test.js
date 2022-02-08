import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
/* компонент содержит NavLink из react-router-dom, поэтому для теста компонент нужно обернуть роутером */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './Header'
import userEvent from '@testing-library/user-event'
import HomePage from './../../pages/HomePage'

const HeaderWithRouter = () => {
  const history = createBrowserHistory()

  return (
    <BrowserRouter location={history.location} navigator={history}>
      <Header />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path="/table-data" element={<div>Table page</div>} />
        <Route path="*" element={<div>Нет совпадений</div>} />
      </Routes>
    </BrowserRouter>
  )
}

describe('проверка тестов в Header', () => {
  test('Ссылка "Главная" присутствует в header', () => {
    render(<HeaderWithRouter />)
    const homeLinkEl = screen.getByText(/Главная/i)

    expect(homeLinkEl).toBeInTheDocument()
  })
  test('Ссылка "Таблица с данными" присутствует в header', () => {
    render(<HeaderWithRouter />)
    const tableLinkEl = screen.getByText(/Таблица с данными/i)

    expect(tableLinkEl).toBeInTheDocument()
  })
  test('Переход по ссылке на домашнюю(главную) страницу работает корректно', () => {
    render(<HeaderWithRouter />)

    const homeLinkEl = screen.getByText(/Главная/i)
    expect(homeLinkEl).toBeInTheDocument()

    userEvent.click(homeLinkEl)

    expect(location.pathname).toBe('/')

    const cardsContainer = screen.getByTestId('cards__container')
    expect(cardsContainer).toBeInTheDocument()
  })
  test('Переход по ссылке на страницу с таблицей работает корректно', () => {
    render(<HeaderWithRouter />)

    const tableLinkEl = screen.getByText(/Таблица с данными/i)
    userEvent.click(tableLinkEl)

    expect(location.pathname).toBe('/table-data')
  })
})
