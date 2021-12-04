import React from 'react';
import useAuthContext from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import useProjectsContext from '../../context/projects/ProjectsContext';


const Logout = () => {
  const { logout } = useAuthContext();
  const { resetProjectState } = useProjectsContext();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
    resetProjectState();
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
