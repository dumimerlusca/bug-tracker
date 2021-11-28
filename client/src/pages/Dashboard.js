import React, { useEffect, Fragment } from 'react';
import useAuthContext from '../context/auth/AuthContext';
import SideMenu from '../components/SideMenu';
import DashboardHeader from '../components/DashboardHeader';

const Dashboard = () => {
  return (
    <Fragment>
      <SideMenu />
      <div className="main_container">
        <DashboardHeader />
        Dashboard page
      </div>
    </Fragment>
  )
}

export default Dashboard
