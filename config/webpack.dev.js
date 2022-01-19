/* импорты */
/* функция для объединения нескольких сборок */
const { merge } = require('webpack-merge')
/* импортируем общую сборку webpack */
const common = require('./webpack.common')

/* эспериментальный плагин для включения быстрого обновления, используется в cra */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/* объединяем настройки 'webpack.common.js' с этими */
module.exports = merge(common, {
  /* режим разработки */
  mode: 'development',
  /* контролирует, как генерируются исходные карты */
  devtool: 'inline-source-map',
  /* сервер используется для разработки */
  devServer: {
    /* при использование HTML5 History API вместо ошибки 404 будет выводиться index.html */
    historyApiFallback: true,
    /* открывает в браузере */
    open: true,
    /* включает сжатие gzip для всего, что обслуживается */
    compress: true,
    /* включает функцию горячей замены модулей */
    hot: true,
    /* указывает клиентам использовать предоставленный порт */
    port: 3000,
  },
  module: {
    /* правила, для обработки указанных расширений */
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        /* расширения файлов, которые webpack будет искать и применять к ним указанные правила ( .js, .jsx) */
        test: /\.(sass|scss|css)$/,
        /* use - свойство, в котором указываются применяемые загрузчики */
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          /* порядок справа налево: webpack сперва запускает sass-loader, который превращает scss в css;
        затем postcss-loader, который добавляет префиксы,
        затем css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } },
          /* порядок справа налево: webpack сперва запускает less-loader, который превращает less в css; 
        затем postcss-loader, который добавляет префиксы,
        затем css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
        ],
      },
    ],
  },
  /* сторонние расширения */
  plugins: [new ReactRefreshWebpackPlugin()],
})
