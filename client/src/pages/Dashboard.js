import React, { useEffect, Fragment } from 'react';
import useAuthContext from '../context/auth/AuthContext';
import SideMenu from '../components/SideMenu';
import DashboardHeader from '../components/DashboardHeader';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <Fragment>
      <SideMenu />
      <div className="main_container">
        <DashboardHeader />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
