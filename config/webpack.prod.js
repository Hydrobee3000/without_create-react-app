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
    /* абсолютный путь */
    publicPath: '/',
  /* Очищает директорию dist перед обновлением бандла
  Свойство стало доступно с версии 5.20.0, до этого использовался
  CleanWebpackPlugin */
    clean: true,
  
  /* название для бандла */    
    filename: "js/[name].[contenthash].bundle.js"
  },

  /* сторонние расширения */
  plugins: [
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css"
    })
    // new CompressionPlugin(),
  ],

  /* настройка процесса оптимизации сборки */
  optimization: {
    /* разделение кода */
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]semantic-ui-([\S]+)[\\/]/,
          name: 'vendor',
          enforce: true
        }
      }
    },
    /* если minimize = true, тогда сработает всё внутри minimizer */
    minimize: true,

    /* средства для оптимизации(перечислены при импорте) */
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
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
    /* Как только сборка выводит несколько фрагментов, опция гарантирует, 
    что они совместно используют среду выполнения webpack, вместо того, чтобы иметь свои собственные. 
    Это также помогает при долгосрочном кэшировании, так как фрагменты будут
    меняться при изменении фактического кода, а не времени выполнения webpack.
    */
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
    /* определяет, когда webpack выдает подсказки производительности на основе максимального размера точки входа в байтах */
    maxEntrypointSize: 512000,
    /* определяет, когда webpack выдает подсказку производитльности на основе размера отдельного ресурса в байтах */
    maxAssetSize: 512000,
  },
});