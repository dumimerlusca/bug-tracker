import React, { Fragment } from 'react';
import useUsersContext from '../../context/users/UsersContext';

const AllUsers = () => {
  const { users, loading } = useUsersContext();

  return (
    <Fragment>
      <h2 className="text-2xl text-center">All the users in database</h2>
      <table className="mx-auto mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {loading !== true && users.map(user => {
            const { email, role, name } = user
            return <tr key={user._id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Fragment>
  )
}

export default AllUsers
