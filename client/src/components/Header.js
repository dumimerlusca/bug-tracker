import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid ">
        <span className="navbar-brand mb-0 h1">Navbar</span>
        <ul className="nav">
          <li className="nav-item"><Link to="/login
          " className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
