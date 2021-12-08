import React from 'react';
import useAuthContext from '../context/auth/AuthContext';
import { FaUserCog, FaBars } from 'react-icons/fa';
import useUiContext from '../context/ui/UiContext';
import { Link } from 'react-router-dom';


const DashboardHeader = () => {
  const { user } = useAuthContext();
  const { showSideMenu, hideSideMenu, isSideMenuVisible } = useUiContext();

  const handleSideMenuVisibility = () => {
    if (isSideMenuVisible) {
      hideSideMenu()
    } else {
      showSideMenu();
    }
  }

  return (
    <header className="bg-primary-700 py-3 sticky z-10 top-0 text-white shadow-md">
      <div className="container">
        <div className="flex justify-between">
          <h3>Loggend is as: <span className="font-semibold">{user.role}</span></h3>
          <div className="flex gap-5 items-center">
            <nav>
              <ul className="flex">
                <li><Link to="/dashboard/userProfile"><FaUserCog className="text-2xl" /></Link></li>
              </ul>
            </nav>
            <button className="side_menu_toggler"
              onClick={handleSideMenuVisibility}>
              <FaBars className="text-3xl hover:opacity-75 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
