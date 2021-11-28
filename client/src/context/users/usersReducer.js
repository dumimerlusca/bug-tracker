import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  SET_LOADING,
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    }

    case GET_USERS_FAIL: {
      return {
        ...state,
        users: null,
        loading: false
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
