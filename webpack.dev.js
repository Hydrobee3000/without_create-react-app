
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  //режим разработки
  mode: "development",

  //контролирует, как генерируются исходные карты
  devtool: "inline-source-map",

  /* сервер используется для разработки */
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
});