export const SET_DATA = 'SET_DATA'
export const FETCH_DATA = 'FETCH_DATA'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'

/* начальный стейт */
const initialState = {
  items: [],
  loading: false,
}

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: //set data in state
      return {
        ...state,
        items: action.payload,
        loading: false,
      }
    case SHOW_LOADER: //show loader
      return {
        ...state,
        loading: true,
      }
    case HIDE_LOADER: //hide loader
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export const setData = (data) => ({ type: SET_DATA, payload: data }) //устанавливает данные в стейт
export const fetchData = () => ({ type: FETCH_DATA }) // Action creator для отслеживания сагой
export const showLoader = () => ({ type: SHOW_LOADER })
export const hideLoader = () => ({ type: HIDE_LOADER })

export default tableReducer
