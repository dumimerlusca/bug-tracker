
const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCES': {
      return { ...state, isRegistered: true }
    }
    case 'REGISTER_FAIL': {
      return { ...state, isRegistered: false }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer