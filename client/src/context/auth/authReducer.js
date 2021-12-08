import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ALERTS,
  LOGOUT,
  REFRESH_TOKEN,
  AUTH_ERROR,
  USER_LOADED,
  SET_LOADING,
  RESET_STATE
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
          alert: null,
          accessToken: action.payload,
          loading: false
        }
      }

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      {
        localStorage.removeItem('accessToken');
        return {
          ...state,
          isAuthenticated: false,
          alert: { message: action.payload, type: 'danger' },
          accessToken: null,
          loading: false
        }
      }

    case AUTH_ERROR: {
      localStorage.removeItem('accessToken');
      return {
        ...state,
        isAuthenticated: false,
        alert: null,
        accessToken: null,
        loading: false
      }
    }

    case USER_LOADED: {
      console.log('Load user success!')
      return {
        ...state,
        isAuthenticated: true,
        alert: null,
        user: action.payload,
        loading: false
      }
    }

    case LOGOUT: {
      localStorage.removeItem('accessToken');
      return {
        ...state,
        isAuthenticated: false,
        alert: null,
        accessToken: null,
        loading: false,
        user: null
      }
    }

    case REFRESH_TOKEN: {
      localStorage.setItem('accessToken', action.payload)
      console.log('refresh token Succes')
      return {
        ...state,
        alert: null,
        accessToken: action.payload,
        loading: true
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
        isAuthenticated: null,
        accessToken: null,
        alert: null,
        loading: true,
        user: null
      }
    }

    default: {
      return { ...state }
    }
  }
}

export default reducer