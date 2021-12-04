import React from 'react';
import useAuthContext from '../context/auth/AuthContext';
import { FaUserCog, FaBars } from 'react-icons/fa';
import useUiContext from '../context/ui/UiContext';


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
    <header className="bg-gray-200 py-3 shadow-md font-thin">
      <div className="container">
        <div className="flex justify-between">
          <h3>Loggend is as: {user.role}<span className="font-semibold"></span></h3>
          <div className="flex gap-5 items-center">
            <nav>
              <ul className="flex">
                <li><button>User actions <FaUserCog /></button></li>
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
