import React from 'react';
import useUsersContext from '../context/users/UsersContext';
import useProjectsContext from '../context/projects/ProjectsContext';
import useTicketsContext from '../context/tickets/TicketsContext';
import AllTickets from './tickets/AllTickets';

const DashboardHome = () => {
  const { users } = useUsersContext();
  const { projects } = useProjectsContext();
  const { tickets } = useTicketsContext();


  return (
    <div>
      <div className="flex gap-2 justify-evenly md:flex-row flex-col ">
        <div className="flex p-3 flex-1 items-center justify-center text-center text-black shadow-lg bg-primary-400">
          <span className="font-thin uppercase text-xl">
            Users:
          </span>
          <span className="font-semibold uppercase ml-3 text-4xl">
            {users && users.length}
          </span>
        </div>
        <div className="flex p-3 flex-1 items-center justify-center text-center text-black bg-primary-300 shadow-lg">
          <span className="font-thin uppercase text-xl">
            Projects:
          </span>
          <span className="font-semibold uppercase ml-3 text-4xl">
            {projects && projects.length}
          </span>
        </div>
        <div className="p-3 flex gap-10 flex-1 items-center justify-center text-center text-black bg-primary-200 shadow-lg">
          <span className="font-thin uppercase text-xl">
            Tickets:
          </span>
          <ul className="flex md:flex-col flex-row">
            <li className="py-1 px-2 bg-red-800 text-left text-white">
              <span>Urgent: </span>
              <span>
                {tickets && tickets.filter(ticket => ticket.priority === 'urgent').length}
              </span>
            </li>
            <li className="py-1 px-2 bg-red-400 text-left">
              <span>High: </span>
              <span>
                {tickets && tickets.filter(ticket => ticket.priority === 'high').length}
              </span>
            </li>
            <li className="py-1 px-2 bg-yellow-400 text-black text-left">
              <span>Medium: </span>
              <span>
                {tickets && tickets.filter(ticket => ticket.priority === 'medium').length}
              </span>
            </li>
            <li className="py-1 px-2 bg-gray-300 text-black text-left">
              <span>Low: </span>
              <span>
                {tickets && tickets.filter(ticket => ticket.priority === 'low').length}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-xl inline-block p-2 my-10  border-b border-solid border-gray-500">All tickets</h1>
      </div>

      <AllTickets />
    </div>
  )
}

export default DashboardHome
