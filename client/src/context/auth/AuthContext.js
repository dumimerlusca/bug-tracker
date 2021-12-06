import React, { createContext, useReducer, useContext, useEffect } from "react";
import reducer from './authReducer';
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ALERTS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REFRESH_TOKEN,
  SET_LOADING
} from '../types';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    accessToken: localStorage.getItem('accessToken'),
    alert: null,
    loading: true,
    user: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, [state.accessToken])

  // Register user
  const register = async (user) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/auth/register', user, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.accessToken })
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.error })
    }
  }

  // Login user
  const login = async (formData) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/auth/login', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.accessToken })
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error })
    }
  }

  // Logout
  const logout = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      await axios.post('/auth/logout', config);
      dispatch({ type: LOGOUT })
    } catch (error) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Load user
  const loadUser = async () => {
    setLoading(true);
    // Set token in global headers
    console.log("Load user...")
    setAuthToken(state.accessToken);
    console.log('Acces token', state.accessToken)
    try {
      const res = await axios.post('/auth/me');
      dispatch({ type: USER_LOADED, payload: res.data.data })
    } catch (error) {
      if (error.response.status === 401) {
        // Make requst to get a new access token (if refresh token is valid)
        checkRefreshToken()
      } else {
        dispatch({ type: AUTH_ERROR, payload: error.message })
      }

    }
  }

  // Check refresh token
  const checkRefreshToken = async () => {
    try {
      const res = await axios.post('/auth/refresh')
      if (res.data.accessToken) {
        console.log('REFRESH TOKEN')
        dispatch({ type: REFRESH_TOKEN, payload: res.data.accessToken });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  }

  // Set loading
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }


  // Clear alerts
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS })
  }

  return (<AuthContext.Provider value={{
    ...state,
    register,
    login,
    logout,
    loadUser,
    clearAlerts,
    checkRefreshToken
  }}>
    {children}
  </AuthContext.Provider>)
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthProvider }
export default useAuthContext