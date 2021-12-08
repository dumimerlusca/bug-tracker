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
    <button className="py-1 px-10 hover:opacity-75 mt-5 transition-all mx-auto block bg-primary-600 rounded"
      onClick={onClick}>
      Logout
    </button>
  )
}

export default Logout
