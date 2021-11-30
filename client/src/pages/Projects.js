import React, { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import AllProjects from '../components/projects/AllProjects'
import SingleProject from '../components/projects/SingleProject';

const Projects = () => {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllProjects />} />
        <Route path=":id" element={<SingleProject />} />
      </Routes>
      <Outlet />
    </Fragment>
  )
}

export default Projects
