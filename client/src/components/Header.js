import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../context/auth/AuthContext';
import Logout from './auth/Logout';

const Header = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid ">
        <span className="navbar-brand mb-0 h1">Navbar</span>
        <ul className="nav">
          {!isAuthenticated && <Fragment>
            <li className="nav-item"><Link to="/login
          " className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
          </Fragment>}

          {isAuthenticated && <Fragment>
            <li className="nav-item"><Link to="/projects
          " className="nav-link">Projects</Link></li>
            <li className="nav-item"><Link to="/tickets" className="nav-link">Tickets</Link></li>
            <li className="nav-item"><Link to="/Register" className="nav-link">Register</Link></li>
            <Logout />
          </Fragment>}
        </ul>
      </div>
    </nav>
  )
}

export default Header
