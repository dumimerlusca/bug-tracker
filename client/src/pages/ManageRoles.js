import React, { Fragment, useEffect } from 'react';
import useUsersContext from '../context/users/UsersContext';
import ManageRolesForm from '../components/users/ManageRolesForm';

const ManageRoles = () => {
  const { getUsers, loading, users } = useUsersContext();

  useEffect(() => {
    console.log('Manage users')
    if (!users) {
      getUsers();
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <h1 className="text-3xl font-light my-10">Manage user roles</h1>
      <div>
        <ManageRolesForm />
      </div>
    </Fragment >
  )
}

export default ManageRoles
