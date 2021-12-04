import React, { createContext, useReducer, useContext } from "react";
import reducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types'

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const initialState = {
    alert: null
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = (alert) => {
    dispatch({ type: 'SET_ALERT', payload: alert })
    setTimeout(() => {
      dispatch({ type: "REMOVE_ALERT" })
    }, 3000)
  }

  return (<AlertContext.Provider value={{
    ...state,
    setAlert
  }}>
    {children}
  </AlertContext.Provider>)
}

const useAlertContext = () => {
  return useContext(AlertContext)
}

export { AlertContext, AlertProvider }
export default useAlertContext