// не загружать "react-refresh/babel" в production сборке
const plugins = []
/* массив плагинов, который используется в настройке plugins
если режим НЕ production, тогда в настройке plugins появится массив плагинов(в котором будет плагин: react-refresh и transform runtime) */
if (process.env.NODE_ENV !== 'production') {
  /* экспериментальный плагин Webpack для включения «быстрого обновления» */
  plugins.push('react-refresh/babel')
  /* Плагин, который позволяет повторно использовать внедренный вспомогательный код Babel для экономии кода */
  plugins.push([
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
    },
  ])
}

module.exports = {
  /* набор пресетов, используемых для поддержки определенных языковых функций */
  presets: [
    /* компилирует es6+ синтаксис в es5. При необходимости автоматически настраивает полифиллы браузера */
    '@babel/preset-env',
    /* добавляет поддержку jsx синтаксиса (реакт)   */
    ['@babel/preset-react', { runtime: 'automatic' }],
    /* позволяет Babel преобразовывать код TypeScript в JavaScript. */
    //"@babel/preset-typescript"                                                *TypeScript config*

    /*
    Runtime automatic with react 17+ позволяет не импортировать React: "import React from 'react' "
    в файлах, в которых импользуется только jsx(без состояния и методов реакт)
    */
  ],
  /* набор плагинов, предоставляют широкие возможности */
  plugins: plugins,
}
