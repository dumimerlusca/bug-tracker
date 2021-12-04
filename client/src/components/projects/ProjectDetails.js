import React from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';

const ProjectDetails = () => {
  const { currentProject } = useProjectsContext();
  const {
    users,
    tickets,
  } = currentProject;

  return (
    <div>
      <div className="flex flex-col mt-10 gap-5 xl:flex-row">
        <div className="flex-1">
          <div className="p-5 bg-blue-200 rounded-md">
            <h2>Assigned Personnel</h2>
            <p className="font-thin">Current Users on this project</p>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  const { name, email, _id, role } = user
                  return (
                    <tr key={_id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-5 bg-blue-200 rounded-md">
            <h2>Tickets for this project</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Submitter</th>
                <th>Developer</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => {
                const { name, description, submitter, developer, _id, createdAt } = ticket
                return (
                  <tr key={_id}>
                    <td className="whitespace-nowrap">{name}</td>
                    <td>{description}</td>
                    <td>{submitter.name}</td>
                    <td>{developer ? developer.name : '-'}</td>
                    <td className="whitespace-nowrap">{createdAt}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
