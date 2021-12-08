import React, { useState, useEffect } from 'react';
import useAuthContext from '../../context/auth/AuthContext';
import useUsersContext from '../../context/users/UsersContext';
import { AiFillCloseCircle } from 'react-icons/ai';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';

const Profile = () => {
  const { user, loadUser } = useAuthContext();
  const { updateUser, alert, clearAlerts } = useUsersContext();
  const { setAlert } = useAlertContext();

  const [edit, setEdit] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...user })
  const { email, name, role } = newProfile;

  useEffect(() => {
    if (alert) {
      setAlert(alert)
      clearAlerts();
    }
  }, [alert])

  const handleOnChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    await updateUser(user._id, newProfile);
    loadUser()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '') {
      setAlert({ message: 'Please enter name and email', type: 'danger' });
      return
    }

    if (name === user.name && email === user.email) {
      setAlert({ message: 'No changes made!', type: 'info' })
      return;
    }
    handleUpdate();
  }

  return (
    <form className=""
      onSubmit={(e) => { handleSubmit(e) }}>
      <div className="max-w-xl mx-auto">
        <h1 className="m-10 text-semi-bold text-3xl">Profile</h1>
        <Alert />
        <div>
          <label htmlFor="name" className="form_label">Name</label>
          <input type="text"
            className={`py-2 px-5 w-full font-thin text-xl rounded-full
            focus:outline-none
          ${edit && 'ring-2 ring-blue-300 focus:ring-3 focus:ring-4'}`}
            readOnly={!edit}
            id="name"
            name="name"
            onChange={(e) => { handleOnChange(e) }}
            value={name} />
        </div>
        <div>
          <label htmlFor="email" className="form_label">Email</label>
          <input type="text"
            className={`py-2 px-5 w-full font-thin text-xl rounded-full
            focus:outline-none 
            ${edit && 'ring-2 ring-blue-300 focus:ring-4'}`}
            readOnly={!edit}
            id="email"
            name="email"
            onChange={(e) => { handleOnChange(e) }}
            value={email} />
        </div>
        <div>
          <label htmlFor="role" className="form_label">Role</label>
          <input type="text"
            className="py-2 px-5 w-full font-thin text-xl rounded-full 
          focus:outline-none"
            readOnly
            value={role}
          />
        </div>
      </div>
      {edit ? (
        <div className="flex gap-5 mt-7 items-center justify-center">
          <button className="py-2 px-10 rounded-full bg-yellow-400 text-white  hover:opacity-75 transition-all"
            type="submit"
          >
            Update
          </button>
          <button onClick={() => {
            setEdit(false);
            setNewProfile({ ...user })
          }}>
            <AiFillCloseCircle className="text-2xl hover:opacity-75 transition-opacity" />
          </button>
        </div>
      ) : (
        <button className="py-2 px-10 rounded-full bg-primary-700 text-white mt-7 mx-auto block hover:opacity-75 transition-all"
          onClick={() => { setEdit(true) }}
        >
          Edit
        </button>
      )}
    </form>
  )
}

export default Profile
