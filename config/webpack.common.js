/* импорты */
/* импортируем пути из файла paths.js и обращаться будем через переменную paths */
const paths = require('./paths')

/* шаблон html */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* минификация css */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* проверяет типизацию typeScript как отдельный процесс           TypeScript config */ 
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const CopyWebpackPlugin = require("copy-webpack-plugin");
/* анализировать размеры бандлов, для наглядности*/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

/* входной файл и включние полифилла для старых браузеров */
  entry: ['@babel/polyfill', paths.src + '/index.js'],
  /* куда файлы отправятся после объединения */
  output: {
    /* имя создаваемого каталога, в котором будут храниться все связанные файлы */
    path: paths.build,
    /* абсолютный путь */
    publicPath: "/",
    /* название для бандла */
    filename: '[name].bundle.js',
    /* Все ассеты будут складываться в dist/assets */
    assetModuleFilename: "images/[hash][ext]",
  },
  /* среда в которой должен запускаться бандл */
  target: "web",
  /* сторонние расширения */
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.public + '/index.html', // файл-шаблон
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src + "/assets",
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    // new ForkTsCheckerWebpackPlugin(),                TypeScript config
    new BundleAnalyzerPlugin(),
  ],

    /* разрешение определенных файлов */
  resolve: {
    /* позволяет при импорте не указывать расширение файлов */
    extensions: [
      '.js', '.jsx', 
    // '.ts', '.tsx'               TypeScript config
  ],
  },

  /* Определяем, как обрабатываются модули в проекте */
  module: {
    /* правила для обработки */
    rules: [
      {
        /* расширения файлов, которые webpack будет искать и применять к ним указанные правила ( .js, .jsx) */
        test: /\.(js|jsx)?$/, 
        /* исключить проверку папки /node_modules */
        exclude: /node_modules/,
        /* use - свойство, в котором указываются применяемые загрузчики,
         в данном случае загрузчик babel-loader, который позволяет транспилировать файлы js с помощью babel и webpack */
        use: ['babel-loader'], 
      },
      {
        /* обработка .sass, .scss, .css */
        test: /\.(s[ac]|c)ss$/,  
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // Это необходимо для импорта ресурсов в CSS, например url().
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        /* порядок справа налево: webpack сперва запускает sass-loader, который превращает scss в css;
        затем postcss-loader, который добавляет префиксы,
        затем css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
      },
      {
        /* обработка .less */
        test: /\.less$/i,   
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
        /* порядок справа налево: webpack сперва запускает less-loader, который превращает less в css; 
        затем postcss-loader, который добавляет префиксы,
        затем css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
      },
      { 
        /* обработка .ico, .gif, .png, .jpg, .jpeg */

        test: /\.(?:ico|gif|png|jpg|jpeg)$/i, 
        /* Параметр `type` заменяет необходимость в url-loade и file-loader в Webpack 5.
         установка `type` на "asset" будет автоматически выбирать между
         выводом изображений в файл или встраиванием их в бандл как base64(в виде строк)
         с максимальным встроенным размером по умолчанию 8 КБ */
        type: 'asset/resource' 
      },
      // Fonts and SVGs: Inline files
      {
        /* обработка .woff, .woff2, .eot, .ttf, .otf, .svg */
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        // Fonts and SVGs: Inline files
        type: 'asset/inline',
      },
    ],
  },
};
