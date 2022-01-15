/* импорты */
/* предоставляет утилиты для работы с путями к файлам и каталогам */
const path = require('path');

/* шаблон html */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* очистка сборки */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* минификация css */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

/* входной файл и включние полифилла для старых браузеров */
  entry: ['@babel/polyfill', './src/index.js'],
  /* куда файлы отправятся после объединения */
  output: {
  /* имя создаваемого каталога, в котором будут храниться все связанные файлы */
    path: path.resolve(__dirname, 'dist'),
    /* название для бандла */
    filename: '[name].bundle.js',
    /* Все ассеты будут складываться в dist/assets */
    assetModuleFilename: "images/[hash][ext]",

    // publicPath: "/",
  },

  /* настройка процесса сборки webpack */
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({
      template: './public/index.html', // файл-шаблон
    }),
    new MiniCssExtractPlugin(),
  ],

    /* разрешение определенных файлов */
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  /* Определяем, как обрабатываются модули в проекте */
  module: {
    rules: [
      {
        //Экспортирует HTML как строку. HTML сворачивается, когда этого требует компилятор.

        test: /\.(html)$/, use: ['html-loader'] 
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'sass-loader',
        ],
        // compiles scss to CSS
        /* порядок справа налево: webpack сперва запускает css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: 'asset', // or asset/resource

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
