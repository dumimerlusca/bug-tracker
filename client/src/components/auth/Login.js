import React, { useState, useEffect } from 'react';
import useAlertContext from '../../context/alert/AlertContext';
import useAuthContext from '../../context/auth/AuthContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAlert, showAlert } = useAlertContext();
  const { login, isAuthenticated, error, clearErrors, loading } = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [isAuthenticated, loading])

  useEffect(() => {
    if (error) {
      setAlert(error.message, error.type);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error])

  const onChange = (e) => {
    switch (e.target.name) {
      case 'email': { setEmail(e.target.value); break }
      case 'password': { setPassword(e.target.value); break }
      default: return
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setAlert('Please enter email and password', 'danger');
      return;
    }
    const user = { email, password }
    login(user)
  }


  return (
    <form onSubmit={(e) => { onSubmit(e) }} className="form">
      <h1 className="text-3xl font-semibold mb-7 text-center">Login</h1>

      {showAlert && <Alert />}

      <div className="mb-2">
        <label htmlFor="email" className="form_label">Email</label>
        <input
          onChange={(e) => { onChange(e) }}
          name="email"
          value={email}
          className="form_input"
          type="email" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form_label">Password</label>
        <input onChange={(e) => { onChange(e) }}
          name="password"
          value={password}
          className="form_input"
          type="password" />
      </div>
      <input type="submit" className="mt-5 py-1 text-center w-full hover:opacity-75 bg-gray-900 text-white" />
    </form>
  )
}

export default Login
