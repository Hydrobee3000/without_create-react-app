import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { tableWatcher } from '../saga/tableSaga'
import tableReducer from './tableReducer'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  tableReducer,
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(tableWatcher)
