export var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')

var mock = new MockAdapter(axios, { delayResponse: 1000 }) //задержка 1 секунда

/* данные для наглядности, имитирующие приход с сервера с задержкой */
mock.onGet('/data').reply(200, {
  data: [
    { name: 'Valorian', value: 567583643454, street: 'Lebovsky' },
    { name: 'Gregory', value: 67865553434, street: 'Chuikovsky' },
    { name: 'Winter', value: 654765865426, street: 'Vaichovsky' },
    { name: 'Victor', value: 5476586564326, street: 'Mayakovsky' },
    { name: 'Andy', value: 2657676545458, street: 'Dobrovolsky' },
  ],
})

export const mockAPI = {
  // запрос на получение данных
  getData() {
    return axios.get('/data').then((response) => {
      return response.data
    })
  },
}
