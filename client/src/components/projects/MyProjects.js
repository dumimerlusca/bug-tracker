import React from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import ProjectsTable from './ProjectsTable';



const MyProjects = () => {
  const { myProjects } = useProjectsContext();

  return (
    <>
      <h1 className="p-5 text-2xl font-thin">My projects</h1>
      <div className="overflow-x-auto mt-10 w-full shadow-2xl">
        <ProjectsTable projects={myProjects} />
      </div>
    </>
  )
}

export default MyProjects
