import React from 'react';
import useAuthContext from '../../context/auth/AuthContext';


const AdminAndProjectManagerOnly = ({ children }) => {
  const { user } = useAuthContext();

  const authorizedRoles = ['admin', 'project manager', 'adminDemo']

  return !authorizedRoles.includes(user.role) ? <h1>Not authorized to access this route. Admin and project managers only!</h1> : children
}

export default AdminAndProjectManagerOnly

