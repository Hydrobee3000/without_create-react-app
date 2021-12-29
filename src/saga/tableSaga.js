import { call, put, takeEvery } from 'redux-saga/effects'
import { mockAPI } from '../components/api/api'
import { FETCH_DATA, setData } from './../redux/tableReducer'

const fetchData = () => mockAPI.getData() //получения данных из mock api

function* fetchDataWorker() {
  const data = yield call(fetchData) //возвращает данные из промиса
  yield put(setData(data))
}

export function* tableWatcher() {
  yield takeEvery(FETCH_DATA, fetchDataWorker)
}
