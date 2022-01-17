/* импорты */
/* функция для объединения нескольких сборок */
const { merge } = require("webpack-merge");
/* импортируем общую сборку webpack */
const common = require("./webpack.common.js");

/* эспериментальный плагин для включения быстрого обновления, используется в cra */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {      //объединяем настройки 'webpack.common.js' с этими
  //режим разработки
  mode: "development",

  /* контролирует, как генерируются исходные карты
  - будет виден исходный код, предотвращает установку точек останова в середине строк, которые не работают вместе с минимизатором */
  devtool: 'cheap-module-source-map',     
  
  /* сервер используется для разработки */
  devServer: {
    historyApiFallback: true,     //при использование HTML5 History API вместо ошибки 404 будет выводиться index.html
    open: true,                   //открывает в браузере
    compress: true,               //включает сжатие gzip для всего, что обслуживается
    hot: true,                    //включает функцию горячей замены модулей
    port: 3000,                   //указывает клиентам использовать предоставленный порт
  },
  /*                  TypeScript config
  module: {
    rules: [
      {
        test: /\.(ts)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            // отключает проверку типов
            transpileOnly: true
          },
        },
      },
    ],
  },
  */
  /* сторонние расширения */
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
});
