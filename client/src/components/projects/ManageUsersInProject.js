import React, { useEffect, useState } from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import Loading from '../Loading';
import useUsersContext from '../../context/users/UsersContext';
import { useParams } from 'react-router-dom';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';


const ManageUsersInProject = () => {
  const {
    currentProject,
    updateProject,
    alert,
    clearAlerts
  } = useProjectsContext();
  const { users } = useUsersContext();
  const { id } = useParams();
  const { setAlert } = useAlertContext();

  const [loading, setLoading] = useState(false);
  const [newUsers, setNewUsers] = useState([...currentProject.users])

  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
    // eslint-disable-next-line
  }, [alert])

  const addUserToProject = (user) => {
    // Check if user is already in array
    if (newUsers.find(element => element._id === user._id)) {
      setAlert({ message: 'User already selected', type: 'danger' })
      return;
    }
    const arr = [...newUsers];
    arr.push(user)
    setNewUsers(arr)
  }

  const removeUserFromProject = (id) => {
    setNewUsers(newUsers.filter(user => user._id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProject(id, { users: newUsers });
    setLoading(false);
  }

  const resetState = (e) => {
    e.preventDefault();
    setNewUsers([...currentProject.users])
    setAlert({ message: 'Users reset success!', type: 'info' })
  }

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  return (
    <form onSubmit={(e) => { handleSubmit(e) }}>
      <h1 className="text-2xl p-10">Manage users in project</h1>
      <div>
        <Alert />
        <div className="flex justify-center gap-5">
          <input className="py-2 px-10 bg-secondary-500 mt-5 text-white" type="submit" value="Submit" />
          <button className="py-2 px-10 bg-red-500 mt-5 text-white"
            onClick={(e) => { resetState(e) }}
          >Reset</button>
        </div>
        <div className="flex flex-col shadow-sm gap-5">
          <div className="flex-1">
            <h1 className="text-xl p-5">Users in project</h1>
            <table className="w-full text-left shadow-md" style={{ minWidth: '700px' }}>
              <thead className="table table-fixed">
                <tr className="w-full table table-fixed bg-secondary-500 text-white border-b-2 border-gray-800 border-opacity-50">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody
                className="block overflow-auto table-fixed"
                style={{ maxHeight: '300px' }}
              >
                {newUsers && newUsers.map(user => {
                  const { name, _id, email, role } = user;
                  return (
                    <tr key={_id}
                      onClick={(e) => { removeUserFromProject(_id) }}
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
          </div>

          <div>
            <h1 className="text-xl p-3 pl-5">All users</h1>
            <h3 className="p-2">Select new users for the project</h3>
            <table className="w-full text-left mt-5 shadow-md">
              <thead className="table table-fixed">
                <tr className="w-full table table-fixed bg-primary-500 text-white border-b-2 border-gray-800 border-opacity-50">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody
                className="block overflow-auto table-fixed"
                style={{ maxHeight: '300px' }}
              >
                {users && users.map(user => {
                  const { name, _id, email, role } = user;
                  return (
                    <tr key={_id}
                      onClick={(e) => { addUserToProject(user) }}
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
          </div>

        </div>
      </div>
    </form >
  )
}

export default ManageUsersInProject
