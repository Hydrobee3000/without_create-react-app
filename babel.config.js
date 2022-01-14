module.exports = {
    presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }],
  ],

    /*
    Runtime automatic with react 17+ позволяет не импортировать React: "import React from 'react' "
    в файлах, в которых импользуется только jsx(без состояния и методов реакт)

    @babel/preset-env говорит webpack скопилировать весь синтаксис в ES5(который понимают браузеры)
    @babel/preset-react добавляет поддержку jsx синтаксиса (реакт)
    */
  }