export const SET_DATA = 'SET_DATA'
export const FETCH_DATA = 'FETCH_DATA'

const defaultState = {
  items: [],
  isFetching: true,
}

function tableReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      }

    default:
      return state
  }
}

export const setData = (data) => ({ type: SET_DATA, payload: data }) //устанавливает данные в стейт
export const fetchData = (data) => ({ type: FETCH_DATA, payload: data }) // Action creator для отслеживания сагой

export default tableReducer
