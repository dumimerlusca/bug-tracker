import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import MyTickets from '../components/tickets/MyTickets';
import TicketDetails from '../components/tickets/TicketDetails';


const Dashboard = () => {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<MyTickets />} />
        <Route path=":id" element={<TicketDetails />} />
      </Routes>
    </Fragment>
  )
}

export default Dashboard
