const defaultState = {
  items: [],
  isFetching: true,
}

function tableReducer(state = defaultState, action) {
  switch (action.type) {
    //  case 'counter/incremented':
    //    return { value: state.value + 1 }

    default:
      return state
  }
}

export default tableReducer
