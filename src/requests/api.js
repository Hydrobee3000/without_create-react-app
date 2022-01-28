export var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')

var mock = new MockAdapter(axios, { delayResponse: 1000 }) //задержка 1 секунда

/* данные для наглядности, имитирующие приход с сервера с задержкой */
mock.onGet('/data').reply(200, {
  data: [
    { name: 'Валерия', value: 5675836, street: 'Ленина' },
    { name: 'Григорий', value: 678655, street: 'Тюленина' },
    { name: 'Виктор', value: 6547658, street: 'Каренина' },
    { name: 'Василий', value: 54765865, street: 'Маяковского' },
    { name: 'Андрей', value: 265767654, street: 'Белозерова' },
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
