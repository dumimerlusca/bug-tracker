import React, { useState, useEffect, useRef } from 'react';
import SingleTicketRow from './SingleTicketRow';
import PropTypes from 'prop-types';
import { VscTriangleDown } from 'react-icons/vsc';
import SearchForm from './SearchForm';


const TicketsTable = ({ tickets, showProject }) => {

  const [currentPriority, setCurrentPriority] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([...tickets])

  const tableBody = useRef();

  useEffect(() => {
    setFilteredTickets([...tickets])
  }, [tickets])

  const handleClick = () => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false);
    } else {
      setIsDropdownVisible(true);
    }
  }

  const filterTicketsByPriority = (e) => {
    setIsDropdownVisible(false)
    if (e.target.textContent === 'all') {
      setFilteredTickets([...tickets]);
      return;
    }
    const newArr = tickets.filter(ticket => ticket.priority === e.target.textContent)
    setFilteredTickets(newArr)
  }

  return (
    <div>
      <SearchForm tableBody={tableBody} />
      <div className="overflow-x-auto shadow-2xl" style={{ minHeight: "300px" }}>
        <table className="w-full">
          <thead>
            <tr className="bg-primary-500 text-white font-thin border-b-2 border-gray-800 border-opacity-50">
              <th>Submitter</th>
              <th>Description</th>
              <th> {showProject ? 'Project' : ''} </th>
              <th className="relative">
                <button className="font-bold"
                  onClick={() => { handleClick() }}
                >
                  <VscTriangleDown />
                  Priority
                </button>
                {isDropdownVisible && (
                  <div className="absolute shadow-md bg-white text-black">
                    <ul className="divide-y-2">
                      <li className="py-2 px-10 capitalize"
                        onClick={(e) => { filterTicketsByPriority(e) }}>
                        urgent
                      </li>
                      <li className="py-2 capitalize"
                        onClick={(e) => { filterTicketsByPriority(e) }}>
                        high
                      </li>
                      <li className="py-2 capitalize"
                        onClick={(e) => { filterTicketsByPriority(e) }}>
                        medium
                      </li>
                      <li className="py-2 capitalize"
                        onClick={(e) => { filterTicketsByPriority(e) }}>
                        low
                      </li>
                      <li className="py-2 capitalize"
                        onClick={(e) => { filterTicketsByPriority(e) }}>
                        all
                      </li>
                    </ul>
                  </div>
                )}
              </th>
              <th>Developer</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody ref={tableBody}>
            {filteredTickets.map(ticket => {
              return <SingleTicketRow key={ticket._id} ticket={ticket} />
            })}
          </tbody>
        </table>
      </div>
    </div>
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
