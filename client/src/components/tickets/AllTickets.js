import React from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import TicketsTable from './TicketsTable';

const AllTickets = () => {
  const { tickets } = useTicketsContext();

  return (
    <div className="overflow-x-auto shadow-2xl">
      <TicketsTable tickets={tickets} />
    </div>
  )
}

export default AllTickets
