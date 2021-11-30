import React, { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import AllProjects from '../components/projects/AllProjects'
import SingleProject from '../components/projects/SingleProject';
import ManageUsersInProject from '../components/projects/ManageUsersInProject';

const Projects = () => {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllProjects />} />
        <Route path=":id" element={<SingleProject />} />
        <Route path=":id/manageUsers" element={<ManageUsersInProject />} />
      </Routes>
      <Outlet />
    </Fragment>
  )
}

export default Projects
