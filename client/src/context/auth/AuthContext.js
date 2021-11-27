import React, { createContext, useReducer, useContext, useEffect } from "react";
import reducer from './reducer';
import useAlertContext from "../alert/AlertContext";
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REFRESH_TOKEN
} from '../types';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    accessToken: localStorage.getItem('accessToken'),
    error: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.accessToken !== null || state.accessToken !== 'null' || !state.accessToken) {
      loadUser();
    }
    // eslint-disable-next-line
  }, [state.token])

  // Register user
  const register = async (user) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await axios.post('auth/register', user, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.accessToken })
    } catch (error) {
      const data = error.response.data
      if (!data.error) {
        const err = createError(error.response.statusText, 'danger')
        dispatch({ type: REGISTER_FAIL, payload: err })
        return;
      }
      if (data.error === 'Duplicated fields value entered') {
        const err = createError('User already exists', 'danger')
        dispatch({ type: REGISTER_FAIL, payload: err })
        return;
      }
      const err = createError(data.error, 'danger')
      dispatch({ type: REGISTER_FAIL, payload: err })
    }
  }

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('auth/login', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.accessToken })
    } catch (error) {
      const data = error.response.data;
      const err = createError(data.error, 'danger');
      dispatch({ type: LOGIN_FAIL, payload: err })
    }
  }

  // Logout
  const logout = () => {
    console.log('Logout');
    dispatch({ type: LOGOUT })
  }

  // Load user
  const loadUser = async () => {
    // Set token in global headers
    console.log("Load user...")
    setAuthToken(state.accessToken);
    try {
      const res = await axios.post('auth/me');
      dispatch({ type: USER_LOADED, payload: res.data.data })
    } catch (error) {
      if (error.response.status === 401) {
        // Make requst to get a new access token (if refresh token is valid)
        const res = await axios.post('auth/refresh');
        if (res.data.accessToken) {
          dispatch({ type: REFRESH_TOKEN, payload: res.data.accessToken })
        }
      }
      console.log(error.response.data)
    }
  }


  // Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }


  // Create error
  function createError(msg, type) {
    return {
      message: msg,
      type: type
    }
  }

  return (<AuthContext.Provider value={{
    ...state,
    register,
    login,
    logout,
    loadUser,
    clearErrors
  }}>
    {children}
  </AuthContext.Provider>)
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthProvider }
export default useAuthContext