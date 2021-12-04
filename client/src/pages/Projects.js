import React, { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import AllProjects from '../components/projects/AllProjects'
import SingleProject from '../components/projects/SingleProject';
import MyProjects from '../components/projects/MyProjects';
import useAuthContext from '../context/auth/AuthContext';
import AdminOnly from '../components/routing/AdminOnly';
import CreateProjectForm from '../components/projects/CreateProjectForm';

const Projects = () => {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AdminOnly> <AllProjects /> </AdminOnly>} />
        <Route path="/myProjects" element={<MyProjects />} />
        <Route path=":id/*" element={<SingleProject />} />
        <Route path="/createProject" element={<AdminOnly> <CreateProjectForm /> </AdminOnly>} />
      </Routes>
    </Fragment>
  )
}

export default Projects
