import React from 'react';
import useAuthContext from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
    logout();
  }

  return (
    <button className="btn btn-light"
      onClick={onClick}>
      Logout
    </button>
  )
}

export default Logout
