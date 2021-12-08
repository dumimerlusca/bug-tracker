import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="login_header py-2 bg-primary-700 text-white">
      <div className="container">
        <div className="flex justify-between">
          <h1>BugTracker</h1>
          <div>
            <nav>
              <ul className="flex gap-3">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
