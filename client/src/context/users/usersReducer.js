import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  SET_LOADING,
  CLEAR_ALERTS,
  RESET_STATE,
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        loading: false,
        alert: null
      }
    }

    case GET_USERS_FAIL: {
      return {
        ...state,
        users: null,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'User updated!', type: 'success' }
      }
    }

    case UPDATE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case CLEAR_ALERTS: {
      return {
        ...state,
        alert: null
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case RESET_STATE: {
      return {
        ...state,
        users: null,
        selectedUser: null,
        loading: false,
        alert: null
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
