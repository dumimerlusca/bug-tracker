import React from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import TicketsTable from '../tickets/TicketsTable';
import UsersTable from '../users/UsersTable';

const ProjectDetails = () => {
  const { currentProject } = useProjectsContext();
  const {
    users,
    tickets,
  } = currentProject;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        <div className="flex-1">
          <div className="p-5 rounded-md">
            <h2 className="text-xl">Assigned Personnel</h2>
            <p className="font-thin">Current Users on this project</p>
          </div>
          <div className="overflow-x-auto w-full shadow-md">
            <UsersTable users={users} />
          </div>
        </div>

        <div className="flex-1">
          <div className="p-5 rounded-md">
            <h2 className="text-xl">Tickets for this project</h2>
          </div>
          <TicketsTable tickets={tickets} showProject={false} />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
