/* предоставляет утилиты для работы с путями к файлам и каталогам */
const path = require('path')

module.exports = {
  /* переменная, хранящая путь к папке src */
  src: path.resolve(__dirname, '../src'),

  /* переменная, хранящая путь к папке dist для production сборки */
  build: path.resolve(__dirname, '../dist'),

  /* переменная, хранящая путь к статическим файлам, которые копируются в папку сборки */
  public: path.resolve(__dirname, '../public'),
}
