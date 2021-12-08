import { useContext, useReducer, createContext } from "react";
import reducer from './usersReducer';
import axios from "axios";
import useAuthContext from "../auth/AuthContext";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  SET_LOADING,
  CLEAR_ALERTS,
  RESET_STATE
} from '../types'

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const initialState = {
    users: null,
    selectedUser: null,
    loading: false,
    alert: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { loadUser, checkRefreshToken } = useAuthContext();

  // GET ALL USERS FROM DATABASE
  const getUsers = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/users');
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_USERS_FAIL, payload: error.response.data.error })
    }
  }

  // UPDATE USER
  const updateUser = async (id, data) => {
    setLoading(true)
    const config = {
      headers: {
        'Content-type': 'application/json'
      },
    }
    try {
      const res = await axios.put(`/users/${id}`, data, config)
      dispatch({ type: UPDATE_USER_SUCCESS })
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.error })
    }

  }

  // CLEAR ALERTS
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS })
  }

  // Reset state
  const resetState = () => {
    dispatch({ type: RESET_STATE })
  }

  //SET LOADING
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }

  return <UsersContext.Provider value={{
    ...state,
    getUsers,
    updateUser,
    clearAlerts,
    resetState
  }}>
    {children}
  </UsersContext.Provider>
}

const useUsersContext = () => {
  return useContext(UsersContext);
}

export { UsersProvider, UsersContext }
export default useUsersContext
