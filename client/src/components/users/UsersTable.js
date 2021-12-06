import React from 'react';
import PropTypes from 'prop-types'


const UsersTable = ({ users, handleClick, usersList }) => {
  return (
    <table className="w-full text-left shadow-md" style={{ minWidth: '700px' }}>
      <thead className="table table-fixed">
        <tr className="w-full table table-fixed bg-primary-500 text-white border-b-2 border-gray-800 border-opacity-50">
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody ref={usersList}
        className="block overflow-auto table-fixed"
        style={{ maxHeight: '300px' }}
      >
        {users && users.map(user => {
          const { name, _id, email, role } = user;
          return (
            <tr key={_id}
              onClick={(e) => {
                if (handleClick) {
                  handleClick(e, _id)
                } else {
                  return
                }
              }}
              className="w-full table table-fixed border-b border-gray-400 border-opacity-25 cursor-pointer"
            >
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  usersList: PropTypes.object,
}

export default UsersTable
