const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development', //режим разработки
  entry: ['@babel/polyfill', './src/index.jsx'], //входной файл

  //куда файлы отправятся после объединения
  output: {
    //имя создаваемого каталога, в котором будут храниться все связанные файлы
    path: path.resolve(__dirname, 'dist'),
    //название для бандла
    filename: '[name].[hash].js', //генерирует каждый раз новое, уникальное название для
    // filename: 'bundle.js'
  },
  //используется для разработки
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  //правила того, как webpack будет собирать, компилировать и связывать файлы для браузера
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], //!важен порядок
        // порядок справа налево: webpack сперва запускает css-loader, который превращает файлы css в js,
        //затем запускает style-loader который извлекает css в файлы в виде строки
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    //плагин для webpack, чтобы он знал какому следовать шаблону html-файла для запуска
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(), //очищает  старые неиспользуемые бандлы
  ],
}
