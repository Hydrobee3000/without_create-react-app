const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: ['>0.25%', 'not ie 11', 'not op_mini all'], //информация о браузерах
    }),
    require('autoprefixer'), //добавляет префиксы согласно can i use
    require('cssnano'), //модульный минификатор
  ],
}
