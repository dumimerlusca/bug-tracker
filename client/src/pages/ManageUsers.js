import React, { useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import DashboardHeader from '../components/DashboardHeader';
import AllUsers from '../components/users/AllUsers';
import useUsersContext from '../context/users/UsersContext';
import ManageRolesForm from '../components/users/ManageRolesForm';

const ManageUsers = () => {
  const { getUsers, loading, users } = useUsersContext();

  useEffect(() => {
    console.log('Manage users')
    if (!users) {
      getUsers();
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SideMenu />
      <div className="main_container">
        <DashboardHeader />
        <div className="container">
          <h1 className="text-3xl font-light my-10">Manage user roles</h1>
          <div className="flex justify-between gap-5">

            <div>
              <ManageRolesForm />
            </div>

            <div className="flex-1">
              <AllUsers />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers
