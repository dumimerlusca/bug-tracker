import React from 'react';
import { useNavigate } from 'react-router';
import useAuthContext from '../../context/auth/AuthContext';
import formatDate from '../../utils/formatDate';
const SingleTicketRow = ({ ticket }) => {
  const {
    name,
    description,
    submitter,
    createdAt,
    priority,
    status,
    developer,
    project,
    _id
  } = ticket
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleOnClick = () => {
    navigate(`/dashboard/tickets/${_id}`)
  }

  return (
    <tr className={`border-b border-gray-400 border-opacity-25 cursor-pointer
    ${developer && (user._id === developer._id) ? 'bg-secondary-100' : null}
    `}
      onClick={handleOnClick}
    >
      <td>{submitter.name}</td>
      <td>
        <div>
          <span className={`py-0 px-2 rounded-xl border-2 bg-white shadow-md font-bold text-sm
            ${status === 'submitted' ? 'text-black' : null}
            ${status === 'in progress' ? 'text-yellow-500' : null}
            ${status === 'in review' ? 'text-blue-700' : null}
            ${status === 'done' ? 'text-blue-300' : null}
          `}>
            {status}
          </span>
          <span className="ml-3 text-md font-semibold">
            {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          </span>
        </div>
        <p className="font-thin text-sm p-1">
          {description.length > 30 ? `${description.slice(0, 30)}...` : description}
        </p>
      </td>
      <td>{project.name}</td>
      <td>
        <span className={`py-1 px-2 font-thin rounded-md
        ${priority === 'urgent' ? 'bg-red-800 text-white' : null}
        ${priority === 'high' ? 'bg-red-500 text-white' : null}
        ${priority === 'medium' ? 'bg-yellow-400 text-dark' : null}
        ${priority === 'low' ? 'bg-gray-500 text-dark' : null}
        `}>
          {priority}
        </span>
      </td>
      <td>{developer ? developer.name : '-'}</td>
      <td>{formatDate(createdAt).length > 25 ?
        `${formatDate(createdAt).slice(0, 25)}... ` :
        formatDate(createdAt)}</td>
    </tr>
  )
}

export default SingleTicketRow
