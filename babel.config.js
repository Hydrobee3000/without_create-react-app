  // не загружать "react-refresh/babel" в production сборке
  const plugins = [];
  /* массив плагинов, который используется в настройке plugins */
  if (process.env.NODE_ENV !== "production") {
      /* если режим НЕ production, тогда в настройке plugins появится массив плагинов(в котором будет один плагин: react-refresh) */
    plugins.push("react-refresh/babel");
  }
  
  module.exports = {
    /* набор пресетов, используемых для поддержки определенных языковых функций */
    presets: [
      /* компилирует es6+ синтаксис в es5. При необходимости автоматически настраивает полифиллы браузера */
      "@babel/preset-env",
      /* добавляет поддержку jsx синтаксиса (реакт)   */ 
      ["@babel/preset-react", { runtime: "automatic" }],
    /*
    Runtime automatic with react 17+ позволяет не импортировать React: "import React from 'react' "
    в файлах, в которых импользуется только jsx(без состояния и методов реакт)
    */
   ],
    /* набор плагинов, предоставляют широкие возможности */
    plugins: plugins,
  };