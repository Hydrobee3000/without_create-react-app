export var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')

var mock = new MockAdapter(axios)

mock.onGet('/data').reply(200, {
  data: [
    { name: 1, value: 567583643454 },
    { name: 2, value: 67865553434 },
    { name: 3, value: 654765865426 },
    { name: 4, value: 5476586564326 },
    { name: 5, value: 2657676545458 },
    { name: 6, value: 0675464653 },
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
