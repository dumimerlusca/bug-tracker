import React, { useState, useEffect } from 'react'
import useAuthContext from '../../context/auth/AuthContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, alert, clearAlerts, isAuthenticated } = useAuthContext();
  const { setAlert } = useAlertContext();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (alert) {
      if (alert.message === 'Duplicated fields value entered') {
        setAlert({ message: 'User already exists !', type: 'danger' });
        clearAlerts();
        return
      }
      setAlert(alert)
      clearAlerts();
    }

    // eslint-disable-next-line
  }, [alert])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }

    // eslint-disable-next-line
  }, [isAuthenticated])

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === "" || password.trim() === "" || password2.trim() === "") {
      setAlert({ message: 'Please fill out all the fields', type: 'danger' })
      return;
    }

    if (password !== password2) {
      setAlert({ message: 'Passwords do not match', type: 'danger' })
      return;
    }
    const newUser = {
      name,
      email,
      password
    }
    register(newUser);
  }

  const onChange = (target, value) => {
    setUser({ ...user, [target.name]: value })
  }

  return (
    <form onSubmit={(e) => { onSubmit(e) }} className="form">
      <h1 className="text-3xl font-semibold mb-7 text-center">Register</h1>

      <Alert />

      <div className="mb-2">
        <label htmlFor="name" className="form_label">Name</label>
        <input onChange={(e) => onChange(e.target, e.target.value)}
          value={name}
          className="form_input"
          name="name"
          id="name"
          type="text" />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form_label">Email</label>
        <input onChange={(e) => onChange(e.target, e.target.value)}
          value={email}
          className="form_input"
          name="email"
          id="email"
          type="text" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form_label">Password</label>
        <input onChange={(e) => onChange(e.target, e.target.value)}
          value={password}
          className="form_input"
          name="password"
          id="password"
          type="password"
          minLength="6" />
      </div>
      <div className="mb-2">
        <label htmlFor="password2" className="form_label">Confirm password</label>
        <input onChange={(e) => onChange(e.target, e.target.value)}
          value={password2}
          className="form_input"
          name="password2"
          id="password2"
          type="password"
          minLength="6" />
      </div>
      <input type="submit" className="mt-5 py-1 text-center w-full hover:opacity-75 bg-gray-900 text-white" />
    </form>
  )
}

export default Register
