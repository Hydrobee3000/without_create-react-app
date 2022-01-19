import { call, put, takeEvery } from 'redux-saga/effects'
import { mockAPI } from '../components/api/api'
import { FETCH_DATA, setData } from './../redux/tableReducer'

const fetchData = () => mockAPI.getData() //получения данных из mock api

/* воркер */
function* fetchDataWorker() {
  /* возвращает данные из промиса, который придет при получении данных из mock api */
  const data = yield call(fetchData) 
  /* аналог dispatch, устанавливает пришедшие данные в стейт tableReducer, отправкой AC(action creator'а) в tableReducer */
  yield put(setData(data))
}

/* наблюдатель за воркером */
export function* tableWatcher() {
  /* при каждом изменении(вызове) FETCH_DATA, вызывает worker'а, который выполнит свою логику */
  yield takeEvery(FETCH_DATA, fetchDataWorker)
}
