import React from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import TicketsTable from './TicketsTable';

const AllTickets = () => {
  const {
    tickets,
    getTickets,
    currentPage,
    totalPages
  } = useTicketsContext();

  const nextPage = () => {
    if (currentPage >= totalPages) {
      return;
    }
    getTickets(`?page=${currentPage + 1}`)
  }
  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    }
    getTickets(`?page=${currentPage - 1}`)
  }

  return (
    <div className="">
      <TicketsTable tickets={tickets} />
      <div className="inline-flex gap-5 p-5 mb-10 float-right">
        <button onClick={prevPage}>Prev</button>
        <div>
          <span>{currentPage}...</span>
          <span>{totalPages}</span>
        </div>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}

export default AllTickets
