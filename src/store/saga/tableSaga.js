/* call(эффект дожидается результата завершения promise)
   put(эффект отправления действия(аналог dispatch) )
   takeEvery(эффект следит за каждым изменением бесконечно)*/
import { call, put, takeEvery } from 'redux-saga/effects'
/* мок апи для получения данных из имитации сервера */
import { mockAPI } from '../../requests/api'
/* FETCH_DATA - action, за изменением которого следит сага;
  setData - функция для установки данных в стейт в tableReducer  
  функции 'спрятать загрузчик', 'показать загрузчик' */
import { FETCH_DATA, setData, hideLoader, showLoader } from '../reducers/tableReducer'

/* получение данных из mock api */
const fetchData = () => mockAPI.getData()

/* воркер */
export function* fetchDataWorker() {
  yield put(showLoader()) //показать загрузчик
  /* возвращает данные из промиса, который придет при получении данных из mock api */
  const data = yield call(fetchData)
  /* аналог dispatch, устанавливает пришедшие данные в стейт tableReducer, отправкой AC(action creator'а) в tableReducer */
  yield put(setData(data))
  yield put(hideLoader()) //спрятать загрузчик
}

/* Следит за Action Creator 'FETCH_DATA' и когда он диспатчится, то вызывает воркер fetchDataWorker */
export function* tableWatcher() {
  /* при каждом изменении(вызове) FETCH_DATA, вызывает worker'а, который выполнит свою логику */
  yield takeEvery(FETCH_DATA, fetchDataWorker)
}
