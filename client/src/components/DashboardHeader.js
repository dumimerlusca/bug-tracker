import React from 'react';
import useAuthContext from '../context/auth/AuthContext';
import { FaUserCog } from 'react-icons/fa'

const DashboardHeader = () => {
  const { user } = useAuthContext();

  return (
    <header className="bg-gray-200 py-3 shadow-md font-thin">
      <div className="container">
        <div className="flex justify-between">
          <h3>Loggend is as: {user.role}<span className="font-semibold"></span></h3>
          <div>
            <nav>
              <ul className="flex">
                <li><a href="">User actions <FaUserCog /></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
