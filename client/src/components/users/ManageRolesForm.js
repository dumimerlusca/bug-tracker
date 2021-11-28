import React, { useState } from 'react'
import useUsersContext from '../../context/users/UsersContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';

const ManageRolesForm = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const { users, loading, updateUser } = useUsersContext();
  const { setAlert, showAlert } = useAlertContext();

  if (loading) {
    return (
      <h1>Loading</h1>
    )
  }


  const handleOnChange = (e) => {
    if (e.target.name === 'selectedUser') {
      setSelectedUser(e.target.value)
      return;
    }
    if (e.target.name === 'selectedRole') {
      console.log(e.target.name)
      setSelectedRole(e.target.value)
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser === '' || setSelectedRole === '') {
      setAlert("Please select user and role", 'danger');
      return
    }

    updateUser(selectedUser, { role: selectedRole })
  }

  return (
    <form onSubmit={(e) => { handleSubmit(e) }}>
      <div className="">
        <h3 className="text-lg">Select 1 or more users</h3>
        {showAlert && <Alert />}
        <select name="selectedUser" id="" style={{ maxHeight: '20px' }}
          value={selectedUser}
          onChange={(e) => { handleOnChange(e) }}
        >
          {users && users.map(user => {
            return (
              <option key={user._id} value={user._id}>{user.name}</option>
            )
          })}
        </select>
      </div>

      <div className="mt-7">
        <h3 className="text-lg">Select role</h3>
        <select name="selectedRole" id="" style={{ maxHeight: '20px' }}
          value={selectedRole}
          onChange={(e) => { handleOnChange(e) }}
        >
          <option value="project manager">Project manager</option>
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
          <option value="submitter">Submitter</option>
        </select>
      </div>
      <input type="submit" className="py-2 px-10 mx-auto block mt-5 text-center" />
    </form>
  )
}

export default ManageRolesForm
