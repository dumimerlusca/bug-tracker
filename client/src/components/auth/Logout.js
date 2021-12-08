import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/auth/AuthContext';
import useProjectsContext from '../../context/projects/ProjectsContext';
import useTicketsContext from '../../context/tickets/TicketsContext';
import useCommentsContext from '../../context/comments/commentsContext';



const Logout = () => {
  const { logout } = useAuthContext();
  const authContext = useAuthContext();
  const projectsContext = useProjectsContext();
  const ticketsContext = useTicketsContext();
  const commentsContext = useCommentsContext();
  const navigate = useNavigate();

  const onClick = async () => {
    authContext.resetState();
    projectsContext.resetState();
    ticketsContext.resetState();
    commentsContext.resetState();
    await logout();
    navigate('/login');
  }

  return (
    <button className="py-1 px-10 hover:opacity-75 mt-5 transition-all mx-auto block bg-primary-600 rounded"
      onClick={onClick}>
      Logout
    </button>
  )
}

export default Logout
