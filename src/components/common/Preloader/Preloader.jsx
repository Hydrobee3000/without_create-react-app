/* элемент загрузчика(крутилка) */
import CircularProgress from '@mui/material/CircularProgress'
/* блочный элемент */
import Box from '@mui/material/Box'
/* стили */
import styles from './Preloader.module.scss'

/* Показывает анимированный загрузчик */
export const Preloader = () => {
  return (
    <Box className={styles.container__preloader}>
      <CircularProgress className={styles.preloader} />
    </Box>
  )
}
