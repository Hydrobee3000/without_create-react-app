/* для корректной работы с генератором */
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom'
import { setData, hideLoader, showLoader, FETCH_DATA } from '../reducers/tableReducer'
import { fetchDataWorker } from './tableSaga'
import { runSaga } from 'redux-saga'
import { mockAPI } from '../../requests/api'

test('тестирование Saga', async () => {
  /* фиктивные данные для проверки отправки */
  const tableData = [{ name: 'Валерия' }]
  mockAPI.getData = jest.fn().mockResolvedValue(tableData)

  /* фиктивный стор; массив содержит все отправленные экшены */
  const dispatched = []

  /* функция запуска саги и записи всех экшенов в массив dispatched */
  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    fetchDataWorker
  )
  /* первый отправленный экшен - showLoader */
  expect(dispatched[0]).toEqual(showLoader())

  /* запрос на получение данных с сервера был произведен */
  expect(mockAPI.getData).toHaveBeenCalled()

  /* второй отправленный экшен - установка данных в редюсер (проверяем, что пришли правильные данные) */
  expect(dispatched[1]).toEqual(setData(tableData))

  /* третий отправленный экшен - hideLoader */
  expect(dispatched[2]).toEqual(hideLoader())
})
