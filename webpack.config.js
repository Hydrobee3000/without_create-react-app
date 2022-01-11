const path = require('path')
/*для доступа к встроенным плагинам */
const webpack = require('webpack') 
/* шаблон html */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* очистка сборки */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/* минификация js */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
/* минификация html */
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
/* минификация изображений */
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { extendDefaultPlugins } = require('svgo')


module.exports = {
  mode: 'development', //режим разработки
  entry: ['@babel/polyfill', './src/index.jsx'], //входной файл

  /* куда файлы отправятся после объединения */
  output: {
    /* имя создаваемого каталога, в котором будут храниться все связанные файлы */
    path: path.resolve(__dirname, 'dist'),
    /* название для бандла */
    filename: '[name].[hash].js', //генерирует каждый раз новое, уникальное название для
  },
  /* используется для разработки */
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  /* правила, как webpack будет собирать, компилировать и связывать файлы для браузера */
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'], 
        /* порядок справа налево: webpack сперва запускает css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    /* плагин для webpack, чтобы он знал какому следовать шаблону html-файла для запуска */
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(), //очищает  старые неиспользуемые бандлы
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
      new HtmlMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                    {
                      name: 'addAttributesToSVGElement',
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },
}
