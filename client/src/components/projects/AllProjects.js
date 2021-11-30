import React, { useEffect } from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const AllProjects = () => {
  const { projects, getProjects, loading } = useProjectsContext();

  useEffect(() => {
    if (!projects) {
      getProjects();
    }
  }, [])

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  return (
    <table className="mx-auto mt-10 text-left w-full">
      <thead>
        <tr>
          <th>Project name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>

        {projects && projects.map(project => {
          const { name, description, _id } = project
          return (
            <tr key={_id}>
              <td>{name}</td>
              <td>{description}</td>
              <td className="flex flex-col items-end ml-10">
                <ul className="list-disc">
                  <li><Link to={`/projects/${_id}/manageUsers`}>Manage users</Link></li>
                  <li><Link to={`/projects/${_id}`}>Details</Link></li>
                </ul>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AllProjects