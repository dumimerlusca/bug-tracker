import React, { useEffect } from 'react';
import useAuthContext from '../../context/auth/AuthContext';
import useProjectsContext from '../../context/projects/ProjectsContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading';



const MyProjects = () => {
  const { getMyProjects, myProjects, loading, projects } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!myProjects && user) {
      getMyProjects(user._id);
    }
  }, [])

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  return (
    <>
      <h1 className="p-10 text-xl font-thin">My projects</h1>
      <table className="mx-auto mt-10 text-left w-full">
        <thead>
          <tr>
            <th>Project name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

          {myProjects && myProjects.map(project => {
            const { name, description, _id } = project
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{description}</td>
                <td className="flex flex-col items-end ml-10">
                  <ul className="list-disc">
                    <li><Link to={`/dashboard/projects/${_id}`}>Details</Link></li>
                  </ul>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default MyProjects
