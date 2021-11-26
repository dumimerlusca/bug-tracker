import React, { createContext, useReducer, useContext } from "react";
import reducer from './reducer';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isRegistered: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Register user
  const register = async (user) => {
    console.log('Fetching...');
    try {
      const res = await fetch('auth/register');
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Login user


  return (<AuthContext.Provider value={{
    ...state,
    register
  }}>
    {children}
  </AuthContext.Provider>)
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthProvider }
export default useAuthContext