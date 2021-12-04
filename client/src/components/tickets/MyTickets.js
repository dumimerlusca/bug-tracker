import React, { useEffect } from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import useAlertContext from '../../context/alert/AlertContext';
import SingleTicketRow from './SingleTicketRow';
import Loading from '../Loading';
import useAuthContext from '../../context/auth/AuthContext';

const MyTickets = () => {
  const { myTickets, loading, getMyTickets } = useTicketsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    console.log('use effect tickets')
    if (!myTickets) {
      getMyTickets(user._id)
    }
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full">
      <h1 className="text-xl m-5 font-thin">My tickets</h1>
      <table className="rounded border bg-gray-50 w-full">
        <thead>
          <tr className="bg-gray-200 font-thin border-b-2 border-gray-800 border-opacity-50">
            <td>Submitter</td>
            <td>Description</td>
            <td>Project</td>
            <td>Priority</td>
            <td>Developer</td>
            <td>Created at</td>
          </tr>
        </thead>
        <tbody>
          {myTickets && myTickets.map(ticket => {
            return <SingleTicketRow key={ticket._id} ticket={ticket} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MyTickets
