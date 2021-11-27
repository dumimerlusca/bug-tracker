import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      {
        localStorage.setItem('accessToken', action.payload);
        return {
          ...state,
          isAuthenticated: true,
          error: null,
          accessToken: action.payload
        }
      }

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      {
        localStorage.removeItem('accessToken');
        return {
          ...state,
          isAuthenticated: false,
          error: action.payload,
          accessToken: null
        }
      }

    case LOGOUT: {
      localStorage.removeItem('accessToken');
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        accessToken: null
      }
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
      }
    }

    default: {
      return { ...state }
    }
  }
}

export default reducer