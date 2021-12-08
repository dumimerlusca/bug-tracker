import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaProjectDiagram, FaUserCog, FaUsers } from 'react-icons/fa';
import { IoBug } from 'react-icons/io5'
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
    <div className={`side_menu bg-primary-500 shadow-xl z-20 text-white ${isSideMenuVisible ? 'active' : null}`}>
      <div className="top_message w-full shadow-xl py-5 px-3 flex items-center justify-center">
        <span>
          <IoBug className="text-7xl text-primary-900" />
        </span>
        <h1 className="text-3xl text-center font-semibold py-5">
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
          {(user.role === 'admin' || user.role === 'adminDemo') &&
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
            <Logout />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideMenu
