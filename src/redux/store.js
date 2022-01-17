import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { tableWatcher } from '../saga/tableSaga'
import tableReducer from './tableReducer'

/* создание промежуточного уровня - саги */
const sagaMiddleware = createSagaMiddleware()

/* создание корневого редюсера, с помощью команды объединения 'compineReducers' */
const rootReducer = combineReducers({
  tableReducer,
})

/* создание стора редакса с корневым редюсером и промежуточным уровнем */
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

/* запуск саги с наблюдателем */
sagaMiddleware.run(tableWatcher)
