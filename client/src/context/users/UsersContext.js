import { useContext, useReducer, createContext } from "react";
import reducer from './usersReducer';
import axios from "axios";
import useAuthContext from "../auth/AuthContext";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  SET_LOADING
} from '../types'

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const initialState = {
    users: null,
    selectedUser: null,
    loading: true
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { loadUser } = useAuthContext();

  // GET ALL USERS FROM DATABASE
  const getUsers = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/users');
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_USERS_FAIL })
      console.log(error.response)
    }
  }

  // UPDATE USER
  const updateUser = async (id, data) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      },
    }
    try {
      const res = await axios.put(`/users/${id}`, data, config)
      console.log(res.data)
      getUsers();
      loadUser();
    } catch (error) {
      console.error(error.message)
    }

  }

  //SET LOADING
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }

  return <UsersContext.Provider value={{
    ...state,
    getUsers,
    updateUser
  }}>
    {children}
  </UsersContext.Provider>
}

const useUsersContext = () => {
  return useContext(UsersContext);
}

export { UsersProvider, UsersContext }
export default useUsersContext
