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

    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  return (
    <>
      <Link to="/dashboard/projects/createProject" className="py-2 inline-block px-5 bg-primary-700 ml-5 mt-10 hover:opacity-75 text-white">Create new project</Link>
      <div className="overflow-x-auto mt-10 w-full shadow-2xl">
        <table className="mx-auto text-left w-full">
          <thead className="w-full">
            <tr className="bg-gray-200 font-thin border-b-2 border-gray-800 border-opacity-50 w-full">
              <th>Project name</th>
              <th>Description</th>
              <th></th>
            </tr>


          </thead>
          <tbody>
            {projects && projects.map(project => {
              const { name, description, _id } = project
              return (
                <tr className="border-b border-gray-400 border-opacity-25"
                  key={_id}>
                  <td className="font-semibold text-primary-700 py-5 text-xl">
                    {name.length > 50 ? `${name.slice(0, 30)}...` : name}
                  </td>
                  <td className="font-thin">
                    {description.length > 50 ? `${description.slice(0, 50)}...` : description}
                  </td>
                  <td className="">
                    <ul className="list-disc">
                      <li><Link to={`/dashboard/projects/${_id}`}>Details</Link></li>
                    </ul>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllProjects
