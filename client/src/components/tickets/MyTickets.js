import React from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import TicketsTable from './TicketsTable';
import useAuthContext from '../../context/auth/AuthContext';

const MyTickets = () => {
  const {
    myTickets,
    getMyTickets,
    myTicketsCurrentPage,
    myTicketsTotalPages
  } = useTicketsContext();
  const { user } = useAuthContext();

  const nextPage = () => {
    if (myTicketsCurrentPage >= myTicketsTotalPages) {
      return;
    }
    getMyTickets(user._id, `&page=${myTicketsCurrentPage + 1}`)
  }
  const prevPage = () => {
    if (myTicketsCurrentPage <= 1) {
      return;
    }
    getMyTickets(user._id, `&page=${myTicketsCurrentPage - 1}`)
  }

  return (
    <div className="w-full">
      <h1 className="text-xl m-5 font-thin">My tickets</h1>
      <TicketsTable tickets={myTickets} />
      <div className="inline-flex gap-5 p-5 float-right">
        <button onClick={prevPage}>Prev</button>
        <div>
          <span>
            {myTicketsCurrentPage}...
          </span>
          <span>{myTicketsTotalPages}</span>
        </div>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}

export default MyTickets
