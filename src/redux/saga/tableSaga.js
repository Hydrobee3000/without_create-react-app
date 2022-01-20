import { call, put, takeEvery } from 'redux-saga/effects'
import { mockAPI } from '@/requests/api'
import { FETCH_DATA, setData } from '@/redux/reducers/tableReducer'

const fetchData = () => mockAPI.getData() //получения данных из mock apis

/* воркер */
function* fetchDataWorker() {
  /* возвращает данные из промиса, который придет при получении данных из mock api */
  const data = yield call(fetchData)
  /* аналог dispatch, устанавливает пришедшие данные в стейт tableReducer, отправкой AC(action creator'а) в tableReducer */
  yield put(setData(data))
}

/* Следит за Action Creator 'FETCH_DATA' и когда он диспатчится, то вызывает воркер fetchDataWorker */
export function* tableWatcher() {
  /* при каждом изменении(вызове) FETCH_DATA, вызывает worker'а, который выполнит свою логику */
  yield takeEvery(FETCH_DATA, fetchDataWorker)
}
