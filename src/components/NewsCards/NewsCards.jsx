import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Card, CardActions } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
/* стили */
import styles from './NewsCards.module.scss'

/* Данные новостей для карточек на главной странице */
// перемести в стор!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

const NewsCards = () => {
  /* На каждую запись новости - создается карточка с заголовком, описанием и ссылкой на новость */
  return (
    <Box className={styles.card__container}>
      {newsData.map((card) => (
        <Card className={styles.card} key={card.id}>
          <CardContent className={styles.card__content}>
            <Typography variant="h6">{card.title}</Typography>
            <Typography
              className={styles.content__description}
              variant="body2"
              color="text.secondary"
            >
              {card.description}
            </Typography>
            <p className={styles.text}></p>
          </CardContent>
          <CardActions className={styles.card__actions}>
            <Link className={styles.actions__link} href={card.link}>
              <Button className={styles.actions__button} variant="outlined" size="small">
                Подробнее
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}

export default NewsCards
