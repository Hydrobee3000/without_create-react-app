const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm

module.exports = {
  mode: 'development', //режим разработки
  entry: './src/index.js', //входная точка
  output: {
    //вывод в
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //название файла
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }), //сгенерирует HTML-файл
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
