import React, { useEffect } from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

const SingleProject = (props) => {
  const { getProject, loading, currentProject } = useProjectsContext();
  const { id } = useParams();

  useEffect(() => {
    getProject(id)
  }, [])

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  if (!currentProject && !loading) {
    return <p>User not found</p>
  }

  const {
    name,
    createdAt,
    createdBy,
    description,
    developers,
    tickets
  } = currentProject;

  return (
    <div className="mt-10">
      <div className="flex p-5 shadow-md">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Project Name</h3>
          <p className="font-thin text-lg">{name}</p>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">Project Description</h3>
          <p className="font-thin text-lg">{description}</p>
        </div>
      </div>
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
                {developers.map(developers => {
                  const { name, email, role } = developers
                  return (
                    <tr key={name}>
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
                <th>Developers</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => {
                const { name, description, createdBy, developers, createdAt } = ticket
                return (
                  <tr key={name}>
                    <td className="whitespace-nowrap">{name}</td>
                    <td>{description}</td>
                    <td>{createdBy.name}</td>
                    <td>
                      {developers.length !== 0 && <span>{developers.map(developer => developer.name).join(', ')}</span>}
                    </td>
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

export default SingleProject
