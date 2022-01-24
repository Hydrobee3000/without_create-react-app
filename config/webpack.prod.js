/* импорты */
/* импортируем пути из файла paths.js и обращаться будем через переменную pathsyyyzz*/
const paths = require('./paths')
/* импортируем общую сборку webpack */
const common = require('./webpack.common')
/* функция для объединения нескольких сборок */
const { merge } = require('webpack-merge')

/* минификация js */
const TerserPlugin = require('terser-webpack-plugin')
/* разделяет css на разные файлы */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* минификация css */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/* объединяем настройки 'webpack.common.js' с этими */
module.exports = merge(common, {
  /* режим производства */
  mode: 'production',
  /* благодаря этому режиму ошибка будет отображаться на той же строчке, что и в исходном коде */
  devtool: 'source-map',

  /* куда файлы отправятся после объединения */
  output: {
    /* Директория, в которой будет
  размещаться итоговый бандл, папка dist в корне приложения */
    path: paths.build,
    /* абсолютный путь */
    publicPath: '/',
    /* название для бандла */
    filename: 'js/[name].[contenthash].bundle.js',
    /* Очищает директорию dist перед обновлением бандла
  Свойство стало доступно с версии 5.20.0, до этого использовался
  CleanWebpackPlugin */
    // clean: true,
  },
  /* определиет, как обрабатываются модули в проекте */
  module: {
    /* правила, для обработки указанных расширений */
    rules: [
      {
        /* расширения файлов, которые webpack будет искать и применять к ним указанные правила ( .js, .jsx) */
        test: /\.(sass|scss|css)$/,
        /* use - свойство, в котором указываются применяемые загрузчики */
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  /* сторонние расширения */
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
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
    /* извлекает CSS в отдельные файлы */
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  /* настройка процесса оптимизации сборки */
  optimization: {
    /* если minimize = true, тогда сработает всё внутри minimizer */
    minimize: true,
    /* средства для оптимизации(перечислены при импорте) */
    minimizer: [new CssMinimizerPlugin(), '...'],

    /* Как только сборка выводит несколько фрагментов, опция гарантирует, 
    что они совместно используют среду выполнения webpack, вместо того, чтобы иметь свои собственные. 
    Это также помогает при долгосрочном кэшировании, так как фрагменты будут
    меняться при изменении фактического кода, а не времени выполнения webpack.
    */
    runtimeChunk: {
      /* имя для блока среды выполнения */
      name: 'runtime',
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
})
