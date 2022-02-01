import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Card, CardActions } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

it('описание карточки отобразится корректно', () => {
  const newsData = [
    {
      id: 1,
      title: 'Вебинар',
      description: '«Диалог о целях в 2022 году»',
      link: 'https://intranet.severstal.com/Press/Lists/MainPageNews/DispForm.aspx?ID=2669',
    },
  ]
  expect(
    <Box>
      {newsData.map((card) => (
        <Card key={card.id}>
          <CardContent>
            <Typography variant="h6">{card.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={card.link} underline="none">
              <Button variant="outlined" size="small">
                Подробнее
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  ).toStrictEqual(
    <Box>
      {newsData.map(() => (
        <Card key="1">
          <CardContent>
            <Typography variant="h6">Вебинар</Typography>
            <Typography variant="body2" color="text.secondary">
              «Диалог о целях в 2022 году»
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              href="https://intranet.severstal.com/Press/Lists/MainPageNews/DispForm.aspx?ID=2669"
              underline="none"
            >
              <Button variant="outlined" size="small">
                Подробнее
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
})
