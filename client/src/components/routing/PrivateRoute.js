import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../../context/auth/AuthContext';
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  if (loading) {
    return <h1>Loading...</h1>
  }
  return isAuthenticated ? children : <Navigate to="/login" />

}

export default PrivateRoute
