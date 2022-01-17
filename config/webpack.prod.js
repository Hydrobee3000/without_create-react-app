/* импорты */
/* импортируем пути из файла paths.js и обращаться будем через переменную pathsyyyzz*/
const paths = require('./paths')

/* функция для объединения нескольких сборок */
const { merge } = require("webpack-merge");
/* импортируем общую сборку webpack */
const common = require("./webpack.common.js");

/* разделяет css на разные файлы */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/* минификация css */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
/* минификация js */
const TerserPlugin = require("terser-webpack-plugin");
/* минификация html */
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
/* минификация изображений */
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
/* сжатые gzip версии ресурсов для их обслуживания с помощью Content-Encoding. */
// const CompressionPlugin = require("compression-webpack-plugin");



module.exports = merge(common, {        //объединяем настройки 'webpack.common.js' с этими
  /* режим производства */
  mode: "production",

  /* благодаря этому режиму ошибка будет отображаться на той же строчке, что и в исходном коде */
  devtool: "source-map",

  /* куда файлы отправятся после объединения */
  output: {

  /* Директория, в которой будет
  размещаться итоговый бандл, папка dist в корне приложения */
    path: paths.build,
    publicPath: '/',
  /* Очищает директорию dist перед обновлением бандла
  Свойство стало доступно с версии 5.20.0, до этого использовался
  CleanWebpackPlugin */
    clean: true,
  
  /* название для бандла */    
    filename: "js/[name].[contenthash].bundle.js",
  },

  /* настройка процесса сборки webpack */
  plugins: [
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    // new CompressionPlugin(),
  ],

  /* настройка процесса оптимизации сборки */
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]semantic-ui-([\S]+)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
    /* если minimize = true, тогда сработает всё внутри minimizer */
    minimize: true,

    /* средства для оптимизации(перечислены при импорте) */
    minimizer: [
      new TerserPlugin({
    terserOptions: {
        format: {
            comments: false,
        },
    },
    extractComments: false,
    // enable parallel running
    parallel: true,
}),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Оптимизация без потерь с пользовательской опцией
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // настроить параметры плагина по умолчанию
                        inlineStyles: {
                          onlyMatchedOnce: false,
                        },
                      },
                    },
                  },
                ],
              ],
            },
          },
        }),
    ],
    /* Как только сборка выводит несколько фрагментов, эта опция гарантирует, что они совместно используют среду выполнения webpack,
      вместо того, чтобы иметь свои собственные. Это также помогает при долгосрочном кэшировании, так как фрагменты будут
      меняться при изменении фактического кода, а не времени выполнения webpack.
    */
    /* добавляет к каждой точке входа дополнительный блок, содержащий только среду выполнения  */
    runtimeChunk: {
      /* имя для блока среды выполнения */
      name: "runtime",
    },
  },
    /* параметры позволяют управлять тем, как webpack уведомляет об ресурсах и точках входа,
    которые превышают определенное ограничение файлов  */
  performance: {
    /* подсказки */
    hints: false, 
    /* определяет, когда webpack выдает подсказки производитльности на основе максимального размера точки входа в байтах */
    maxEntrypointSize: 512000,
    /* определяет, когда webpack выдает подсказку производитльности на основе размера отдельного ресурса в байтах */
    maxAssetSize: 512000,
  },
});