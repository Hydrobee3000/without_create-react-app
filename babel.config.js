const plugins = []
/* массив плагинов, которые будет использовать babel */

if (process.env.NODE_ENV !== "production") {
  plugins.push("react-refresh/babel")
}
/* если режим разработки не является "production", тогда к плагинам добавится плагин react-refresh -
плагин быстрой перезагрузки без обновления всей страницы */

module.exports = {
    presets: [
      "@babel/preset-env",
      /*
      @babel/preset-env говорит webpack скопилировать весь синтаксис в ES5(который понимают браузеры)
      */
      ["@babel/preset-react", {runtime: "automatic" }],
      /*
      @babel/preset-react добавляет поддержку jsx синтаксиса (реакт)
      время выполнения "automatic" импортирует функции, которые транспилирует jsx */
       // Runtime automatic with React 17+ allows not importing React
       // in files only using JSX (no state or React methods)
    ],
   
      plugins: plugins,
  }