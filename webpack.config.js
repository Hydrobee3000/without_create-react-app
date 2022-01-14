/* предоставляет утилиты для работы с путями к файлам и каталогам */
const path = require('path')
/*для доступа к встроенным плагинам */
const webpack = require('webpack') 
/* шаблон html */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* очистка сборки */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/* минификация css */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* минификация js */
const TerserPlugin = require('terser-webpack-plugin')
/* минификация html */
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
/* минификация изображений */
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')


module.exports = {
  mode: 'development', //режим разработки
  target: 'web',
  entry: ['@babel/polyfill', './src/index.js'], //входной файл и включние полифилла 

  /* куда файлы отправятся после объединения */
  output: {
    /* имя создаваемого каталога, в котором будут храниться все связанные файлы */
    path: path.resolve(__dirname, 'dist'),
    /* название для бандла */
    filename: 'bundle.js', 
    assetModuleFilename: "images/[hash][ext]",

  },
  /* используется для разработки */
  devServer: {
    port: 3000,
    static: "./dist",
    hot: true,
  },
    /* разрешение определенных файлов */
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  /* правила, как webpack будет собирать, компилировать и связывать файлы для браузера */
  module: {
    rules: [
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
            options: { publicPath: "" },
          }, 
          'css-loader', 
          "sass-loader"
        ], 
        // compiles scss to CSS
        /* порядок справа налево: webpack сперва запускает css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации */
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   type: 'asset',
      // },
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
        type: "asset",  //or asset/resource

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
          type: 'asset/inline'
        },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),    //очищает  старые неиспользуемые бандлы
    /* плагин для webpack, чтобы он знал какому следовать шаблону html-файла для запуска */
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
      new HtmlMinimizerPlugin(),
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       // Lossless optimization with custom option
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         // Svgo configuration here https://github.com/svg/svgo#configuration
      //         [
      //           {
      //             name: 'preset-default',
      //             params: {
      //               overrides: {
      //                 // customize default plugin options
      //                 inlineStyles: {
      //                   onlyMatchedOnce: false,
      //                 },
      //               },
      //             },
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // }),
    ],
  },
}
