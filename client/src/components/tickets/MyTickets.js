import React from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import TicketsTable from './TicketsTable';

const MyTickets = () => {
  const { myTickets } = useTicketsContext();

  return (
    <div className="w-full">
      <h1 className="text-xl m-5 font-thin">My tickets</h1>
      <div className="overflow-x-auto shadow-2xl">
        <TicketsTable tickets={myTickets} />
      </div>
    </div>
  )
}

export default MyTickets
