import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
/* данные карточек новостей */
import NewsCards, { newsData } from './NewsCards'

describe('Данные карточек новостей будут интегрированы в DOM', () => {
  newsData.map((card, i) => {
    test(`данные карточки ${i + 1} отображаются в dom`, () => {
      render(<NewsCards />)
      const element = screen.getByText(card.title, card.description)
      expect(element).toBeInTheDocument()
    })
  })
})
