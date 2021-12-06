import React from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import { Link } from 'react-router-dom';
import ProjectsTable from './ProjectsTable';

const AllProjects = () => {
  const { projects } = useProjectsContext();

  return (
    <>
      <Link to="/dashboard/projects/createProject" className="py-2 inline-block px-5 bg-secondary-500 ml-5 mt-10 hover:opacity-75 text-white">Create new project</Link>
      <div className="overflow-x-auto mt-10 w-full shadow-2xl">
        <ProjectsTable projects={projects} />
      </div>
    </>
  )
}

export default AllProjects
