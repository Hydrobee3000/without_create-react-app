const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development', //режим разработки
  target: 'web',
  entry: ['@babel/polyfill', './src/index.jsx'], //входной файл
  output: {
    //вывод в
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js', //генерирует каждый раз новое название для бандла
  },
  devServer: {
    static: './src',
    port: 3000,
  },
  plugins: [
    // new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }), //сгенерирует HTML-файл
    new CleanWebpackPlugin(), //очищает  старые неиспользуемые бандлы
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
}
