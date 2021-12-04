import React, { useState, useRef, useEffect } from 'react'
import useUsersContext from '../../context/users/UsersContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import Loading from '../Loading';

const ManageRolesForm = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('submitter');

  const { users, loading, updateUser, alert, clearAlerts } = useUsersContext();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser === '' || selectedRole === '') {
      setAlert({ message: "Please select user and role", type: 'danger' });
      return
    }
    updateUser(selectedUser, { role: selectedRole })
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
        <h3 className="text-lg">Select 1 or more users</h3>
        <Alert />
        <div className="overflow-x-auto w-full shadow-2xl">
          <table className="w-full text-left shadow-md" style={{ minWidth: '700px' }}>
            <thead className="table table-fixed">
              <tr className="w-full table table-fixed bg-gray-200 border-b-2 border-gray-800 border-opacity-50">
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
                    onClick={(e) => { handleClick(e, _id) }}
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

      <div className="mt-7">
        <h3 className="text-lg">Select role</h3>
        <select name="selectedRole" id=""
          value={selectedRole}
          onChange={(e) => { handleOnChange(e) }}
        >
          <option value="submitter">Submitter</option>
          <option value="developer">Developer</option>
          <option value="project manager">Project manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <input type="submit" className="py-2 px-10 bg-primary-700 text-white hover:opacity-75 mx-auto block mt-5 text-center" />
    </form>
  )
}

export default ManageRolesForm
