/* импорты */
/* импортируем пути из файла paths.js и обращаться будем через переменную paths */
const paths = require('./paths')

/* шаблон html */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* разделяет css на разные файлы */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* анализировать размеры бандлов, для наглядности*/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/* копирует файлы в папку назначения */
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* проверяет типизацию typeScript как отдельный процесс */
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')  //TypeScript config

module.exports = {
  /* входной файл и включние полифилла для старых браузеров */
  entry: [paths.src + '/index.js'],

  /* куда файлы отправятся после объединения */
  output: {
    /* имя создаваемого каталога, в котором будут храниться все связанные файлы */
    path: paths.build,
    /* название для бандла */
    filename: 'js/[name].bundle.js',
    /* названия для пакетов с разделением кода */
    chunkFilename: 'js/[name].bundle.js',
    /* абсолютный путь */
    publicPath: '/',
  },

  /* среда в которой должен запускаться бандл */
  target: 'web',

  /* сторонние расширения */
  plugins: [
    /* копирует файлы в папку назначения */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src + '/assets',
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    /* Проверяет ts на ошибки типов */
    // new ForkTsCheckerWebpackPlugin(),                //TypeScript config
    /* Генерирует HTML-файл из шаблона */
    new HtmlWebpackPlugin({
      favicon: paths.src + '/assets/images/favicon.png', //  иконка для браузера
      template: paths.src + '/index.html', // шаблонный файл
    }),
    /* анализирует бандлы, для webpack */
    // new BundleAnalyzerPlugin(),
  ],

  /* определяет, как обрабатываются модули в проекте */
  module: {
    /* правила, для обработки указанных расширений */
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        /* расширения файлов, которые webpack будет искать и применять к ним указанные правила ( .js, .jsx) */
        test: /\.(js|jsx)?$/,
        /* исключить проверку папки /node_modules */
        exclude: /node_modules/,
        /* use - свойство, в котором указываются применяемые загрузчики,
         в данном случае загрузчик babel-loader, который позволяет транспилировать файлы js с помощью babel и webpack */
        use: ['babel-loader'],
      },
      /* копирует файлы изображений в папку сборки */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        /* Параметр `type` заменяет необходимость в url-loader и file-loader в Webpack 5.
         установка `type` на "asset" будет автоматически выбирать между
         выводом изображений в файл или встраиванием их в бандл как base64(в виде строк)
         с максимальным встроенным размером по умолчанию 8 КБ */
        type: 'asset/resource',
      },

      /* Шрифты и SVG - встроенные файлы */
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      /*
      {
        test: /\.tsx?$/,                    //TypeScript config
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            //выключает проверку типов - она будет выполнять плагином ForkTsChecker
            transpileOnly: true
          }
        }
      }
      */
    ],
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // на проде этот кусок кода уже есть, это для режима разработки только, чтобы увидеть lazy loading

  optimization: {
    /* если minimize = true, тогда сработает всё внутри minimizer */
    minimize: false,

    /* настройки разделения кода в отдельные файлы */
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /* эти параметры изменяют способ разрешения модулей */
  resolve: {
    modules: [paths.src, 'node_modules'],
    /* позволяет при импорте не указывать расширение файлов */
    extensions: [
      '.js',
      '.jsx',
      '.json',
      // '.ts', '.tsx'            //TypeScript config
    ],
    /*  создает псевдонимы для import или require определенных модулей.  */
    alias: {
      /* псевдоним '@' = пути ../src  при импорте*/
      '@': paths.src,
      /* псевдоним assets = пути  ../public  при импорте*/
      assets: paths.public,
    },
  },
  /* настройка процесса оптимизации сборки */
}
