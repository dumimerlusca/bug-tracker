import React, { createContext, useReducer, useContext } from "react";
import reducer from './reducer';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const initialState = {
    showAlert: false,
    type: null,
    message: null
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = (type, msg) => {
    console.log('SetAlert', type, msg);
    dispatch({ type: 'SET_ALERT', payload: { type, msg } })
    removeAlert();
  }

  const removeAlert = () => {
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