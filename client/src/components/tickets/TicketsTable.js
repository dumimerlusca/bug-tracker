import React from 'react';
import SingleTicketRow from './SingleTicketRow';
import PropTypes from 'prop-types'


const TicketsTable = ({ tickets, showProject }) => {
  return (
    <table className="rounded shadow-md w-full">
      <thead>
        <tr className="bg-primary-500 text-white font-thin border-b-2 border-gray-800 border-opacity-50">
          <th>Submitter</th>
          <th>Description</th>
          <th> {showProject ? 'Project' : ''} </th>
          <th>Priority</th>
          <th>Developer</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => {
          return <SingleTicketRow key={ticket._id} ticket={ticket} />
        })}
      </tbody>
    </table>
  )
}

TicketsTable.propTypes = {
  tickets: PropTypes.array.isRequired,
  showProject: PropTypes.bool,
}

TicketsTable.defaultProps = {
  showProject: true
}

export default TicketsTable
