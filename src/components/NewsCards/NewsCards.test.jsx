import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import NewsCards from './NewsCards'

/* данные карточек новостей */
const newsData = [
  {
    id: 1,
    title: 'Вебинар',
    description: '«Диалог о целях в 2022 году»',
    link: 'https://intranet.severstal.com/Press/Lists/MainPageNews/DispForm.aspx?ID=2669',
  },
  {
    id: 2,
    title: 'Продуктово-предпринимательская лаборатория',
    description: 'Твой первый шаг к продуктивному подходу',
    link: 'https://intranet.severstal.com/sites/sevrosstal/Predpr/departm/bs/ProductEntrepreneuriallaboratory/Pages/default.aspx',
  },
  {
    id: 3,
    title: '«Новая реальность»',
    description: 'Программа запустилась!',
    link: 'https://study-srv.severstal.com/fiori#zhcmi713_ui5-display&/event?trainingId=90131848%26trainingType=D',
  },
  {
    id: 4,
    title: 'SAP S/4HANA',
    description: '«План дальнейшего развития»',
    link: 'https://intranet.severstal.com/projectsSAPS4HANA/Pages/default.aspx',
  },
  {
    id: 5,
    title: '«Северсталь канаты»',
    description: '«получили сертификат API Monogram®»',
    link: 'https://intranet.severstal.com/Press/Lists/MainPageNews/DispForm.aspx?ID=2675&Source=https://intranet.severstal.com/SeverstalPages/home.aspx',
  },
  {
    id: 6,
    title: 'Атомный потенциал',
    description:
      '«Северсталь» стала поставщиком металлического порошка для производства тяжелых бетонов с радиационной устойчивостью, использующихся в строительстве атомной электростанции (АЭС).',
    link: 'https://gazeta.severstal.com/rus/archive/2022/3/atomnyy-potencial.phtml',
  },
  {
    id: 7,
    title: 'Мобильное приложение «Северсталь-инфо»',
    description:
      'Вы будете в курсе всех событий компании, находясь в любом месте, где есть интернет',
    link: 'https://intranet.severstal.com/Press/mobile/Pages/default.aspx',
  },
]

describe('Данные карточек новостей будут интегрированы в DOM', () => {
  newsData.map((card, i) => {
    test(`данные карточки ${i + 1} отображаются в dom`, () => {
      render(<NewsCards />)
      const element = screen.getByText(card.title, card.description)
      expect(element).toBeInTheDocument()
    })
  })
})
