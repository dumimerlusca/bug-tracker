import React, { useState, useRef, useEffect } from 'react'
import useUsersContext from '../../context/users/UsersContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import Loading from '../Loading';
import UsersTable from './UsersTable';

const ManageRolesForm = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('submitter');

  const {
    users,
    loading,
    updateUser,
    getUsers,
    alert,
    clearAlerts } = useUsersContext();
  const { setAlert } = useAlertContext();

  const usersList = useRef(null);

  const handleOnChange = (e) => {
    if (e.target.name === 'selectedUser') {
      setSelectedUser(e.target.value)
      return;
    }
    if (e.target.name === 'selectedRole') {
      setSelectedRole(e.target.value)
      return;
    }
  }

  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
    // eslint-disable-next-line
  }, [alert])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser === '' || selectedRole === '') {
      setAlert({ message: "Please select user and role", type: 'danger' });
      return
    }
    await updateUser(selectedUser, { role: selectedRole })
    getUsers();
    setSelectedRole('');
    setSelectedUser('submitter');
  }

  const handleClick = (e, id) => {
    const list = usersList.current.querySelectorAll('tr');
    list.forEach(item => {
      item.classList.remove('active_user')
    })
    e.target.parentElement.classList.add('active_user')
    setSelectedUser(id);
  }

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }


  return (
    <form className="w-full"
      onSubmit={(e) => { handleSubmit(e) }}>
      <div className="">
        <h3 className="text-xl p-5">Select user</h3>
        <Alert />
        <div className="overflow-x-auto w-full shadow-2xl">
          <UsersTable users={users} handleClick={handleClick} usersList={usersList} />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-xl p-5">Select role</h3>
        <select name="selectedRole" id=""
          value={selectedRole}
          onChange={(e) => { handleOnChange(e) }}
        >
          <option value="submitter">Submitter</option>
          <option value="developer">Developer</option>
          <option value="project manager">Project manager</option>
          <option value="admin">Admin</option>
          <option value="adminDemo">Admin Demo</option>
          <option value="submitterDemo">Dubmitter Demo</option>
          <option value="developerDemo">Developer Demo</option>
        </select>
      </div>
      <input type="submit" className="py-2 px-10 bg-secondary-500 text-white hover:opacity-75 mx-auto block mt-5 text-center" />
    </form>
  )
}

export default ManageRolesForm
