const GET_DATA = 'GET_DATA'

const defaultState = {
  items: [],
  isFetching: true,
}

function tableReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        items: action.payload,
      }

    default:
      return state
  }
}

const setData = (data) => ({ type: SET_DATA, payload: data })

export default tableReducer
