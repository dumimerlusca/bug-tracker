import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaProjectDiagram, FaUserCog, FaUsers } from 'react-icons/fa';
import { AiOutlineProject } from 'react-icons/ai';
import { GiTicket } from 'react-icons/gi';
import Logout from './auth/Logout';
import useAuthContext from '../context/auth/AuthContext';
import useUiContext from '../context/ui/UiContext';

const SideMenu = () => {
  const { user } = useAuthContext();
  const { isSideMenuVisible, hideSideMenu } = useUiContext();

  useEffect(() => {
    if (window.innerWidth < 1280) {
      hideSideMenu()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`side_menu bg-primary-200 shadow-xl text-black ${isSideMenuVisible ? 'active' : null}`}>
      <div className="top_message w-full shadow-xl">
        <h1 className="text-3xl text-center py-5 font-thin">
          Welcome  {user.name}!
        </h1>
      </div>
      <nav className="side_nav w-full">
        <ul>
          <li>
            <Link to="/dashboard"
              className="side_menu_link"
              onClick={hideSideMenu}>
              <MdDashboardCustomize />
              <span className="">
                Dashboard Home
              </span>
            </Link>
          </li>
          {user.role === 'admin' &&
            <>
              <li>
                <Link to="/dashboard/manageRoles"
                  className="side_menu_link"
                  onClick={hideSideMenu}>
                  <FaUsers />
                  <span className="">
                    Manage Role Assignment
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/projects"
                  className="side_menu_link"
                  onClick={hideSideMenu}>
                  <AiOutlineProject />
                  <span className="">
                    All Projects
                  </span>
                </Link>
              </li>
            </>
          }
          <li>
            <Link to="/dashboard/projects/myProjects"
              className="side_menu_link flex"
              onClick={hideSideMenu}>
              <FaProjectDiagram />
              <span className="">
                My Projects
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/tickets"
              className="side_menu_link"
              onClick={hideSideMenu}>
              <GiTicket />
              <span className="">
                My Tickets
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile"
              className="side_menu_link"
              onClick={hideSideMenu}>
              <FaUserCog />
              <span className="">
                User profile
              </span>
            </Link>
          </li>
          <li><Logout /></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideMenu
