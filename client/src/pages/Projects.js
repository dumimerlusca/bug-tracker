import React, { Fragment } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideMenu from '../components/SideMenu';

const Projects = () => {
  return (
    <Fragment>
      <SideMenu />
      <div className="main_container">
        <DashboardHeader />
        Projects page
      </div>
    </Fragment>
  )
}

export default Projects
