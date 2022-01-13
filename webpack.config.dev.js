const path = require('path')
const webpack = require('webpack') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development', 
  entry: ['@babel/polyfill', './src/index.js'], 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', 
  },
  devServer: {
    port: 3000,
    static: './dist',
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], 
      },
      
      /* порядок справа налево: webpack сперва запускает css-loader, который превращает файлы css в js,
        затем запускает MiniCssExtractPlugin.loader для минификации 
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: { publicPath: "" },
            // },
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        */
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(), 
    new ReactRefreshWebpackPlugin()
  ],
}

/*
{filename: 'style.css',}
*/