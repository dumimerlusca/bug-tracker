import React from 'react';
import useAuthContext from '../../context/auth/AuthContext';


const AdminOnly = ({ children }) => {
  const { user } = useAuthContext();

  return user.role !== 'admin' ? <h1>Not authorized to access this route. Admin only!</h1> : children
}

export default AdminOnly
