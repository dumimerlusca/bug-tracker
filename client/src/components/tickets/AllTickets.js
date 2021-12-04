import React from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import SingleTicketRow from './SingleTicketRow';

const AllTickets = () => {
  const { tickets } = useTicketsContext();

  return (
    <div className="overflow-x-auto shadow-2xl">
      <table className="rounded border shadow-md w-full">
        <thead>
          <tr className="bg-gray-200 font-thin border-b-2 border-gray-800 border-opacity-50">
            <th>Submitter</th>
            <th>Description</th>
            <th>Project</th>
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
    </div>
  )
}

export default AllTickets
