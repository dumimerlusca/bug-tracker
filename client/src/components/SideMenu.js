import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md'
import { FaProjectDiagram, FaUserCog } from 'react-icons/fa'
import { GiTicket } from 'react-icons/gi';
import Logout from './auth/Logout';
import useAuthContext from '../context/auth/AuthContext';

const SideMenu = () => {
  const { user } = useAuthContext();

  return (
    <div className="side_menu bg-gray-100 shadow-lg">
      <div className="px-2 py-6">
        <h1 className="text-3xl">Welcome  {user.name}!</h1>
      </div>
      <nav className="side_nav">
        <ul>
          <li><Link to="/dashboard" className="side_menu_link"> <MdDashboardCustomize /> Dashboard Home </Link> </li>
          {user.role === 'admin' &&
            <li><Link to="/manageUsers" className="side_menu_link"> <MdDashboardCustomize /> Manage users </Link> </li>
          }
          <li><Link to="/projects" className="side_menu_link flex"> <FaProjectDiagram /> <span>Projects</span> </Link> </li>
          <li><Link to="/tickets" className="side_menu_link"> <GiTicket /> Tickets </Link> </li>
          <li><Link to="/profile" className="side_menu_link"> <FaProjectDiagram /> user Profile </Link> </li>
          <li><Logout /></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideMenu
