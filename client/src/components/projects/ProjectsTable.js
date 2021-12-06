import React from 'react'
import { Link } from 'react-router-dom';

const ProjectsTable = ({ projects }) => {
  return (
    <table className="mx-auto text-left w-full">
      <thead className="w-full">
        <tr className="bg-primary-500 text-white font-thin border-b-2 border-gray-800 border-opacity-50 w-full">
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
              <td className="font-semibold text-primary-900 py-5 text-xl">
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
  )
}

export default ProjectsTable
