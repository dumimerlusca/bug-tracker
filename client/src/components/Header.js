import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../context/auth/AuthContext';
import Logout from './auth/Logout';

const Header = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <header className="login_header py-2 bg-gray-800 text-white">
      <div className="container">
        <div className="flex justify-between">
          <h1>BugTracker</h1>
          <div>
            <nav>
              <ul className="flex gap-3">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <Logout />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
