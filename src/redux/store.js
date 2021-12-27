import { combineReducers, createStore } from 'redux'
import tableReducer from './table-reducer'

const rootReducer = combineReducers({
  table: tableReducer,
})

export const store = createStore(rootReducer)
