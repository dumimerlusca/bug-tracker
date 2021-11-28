
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT': {
      return {
        ...state,
        showAlert: true,
        message: action.payload.msg,
        type: action.payload.type
      }
    }
    case 'REMOVE_ALERT': {
      return {
        ...state,
        showAlert: false,
        message: null,
        type: null
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer